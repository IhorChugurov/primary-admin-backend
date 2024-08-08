import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { Project } from "src/projects/entities/project.entity";
import { EntityDefinition } from "../entities/entity-definition.entity";
import { CreateEntityDefinitionDto } from "../dto/create-entity-definition.dto";
import { UpdateEntityDefinitionDto } from "../dto/update-entity-definition.dto";

@Injectable()
export class EntityDefinitionRepository extends Repository<EntityDefinition> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(EntityDefinition, dataSource.createEntityManager());
  }

  async createAndSave(
    createEntityDefinitionDto: CreateEntityDefinitionDto,
    project: Project,
  ): Promise<EntityDefinition> {
    const newEntityDefinition = this.create({
      name: createEntityDefinitionDto.name,
      url: createEntityDefinitionDto.url,
      tableName: createEntityDefinitionDto.tableName,
      description: createEntityDefinitionDto.description,
      type: createEntityDefinitionDto.type,
      project,
    });
    try {
      await this.save(newEntityDefinition);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.ENTITY_DEFINITION);
    }
    return this.findOneByIdWithRelations(newEntityDefinition.id, project.id, ["project"]);
  }

  async updateByIdWithRelations(
    id: string,
    updateEntityDefinitionDto: UpdateEntityDefinitionDto,
    projectId: string,
    relations: string[] = [],
  ): Promise<EntityDefinition> {
    await this.update(
      { id, project: { id: projectId } },
      {
        name: updateEntityDefinitionDto.name,
        url: updateEntityDefinitionDto.url,
        tableName: updateEntityDefinitionDto.tableName,
        description: updateEntityDefinitionDto.description,
        type: updateEntityDefinitionDto.type,
      },
    );
    return this.findOneByIdWithRelations(id, projectId, relations);
  }

  async deleteById(id: string, projectId: string): Promise<void> {
    await this.delete({ id, project: { id: projectId } });
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
  ): Promise<{ entities: EntityDefinition[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("entityDefinition");

    queryBuilder
      .leftJoinAndSelect("entityDefinition.project", "project")
      .where("project.id = :projectId", { projectId })
      .orderBy("entityDefinition.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("entityDefinition.name LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<EntityDefinition> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }

  findOneByID(id: string, projectId: string): Promise<EntityDefinition> {
    return this.findOne({
      where: { id, project: { id: projectId } },
    });
  }
}
