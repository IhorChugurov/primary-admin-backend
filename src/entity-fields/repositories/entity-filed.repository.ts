import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { EntityField } from "../entities/entity-field.entity";
import { EntityDefinition } from "src/enitity-definitions/entities/entity-definition.entity";
import { CreateEntityFieldDto } from "../dto/create-entity-field.dto";
import { UpdateEntityFieldDto } from "../dto/update-entity-field.dto";

@Injectable()
export class EntityFieldRepository extends Repository<EntityField> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(EntityField, dataSource.createEntityManager());
  }

  async createAndSave(
    createEntityFieldDto: CreateEntityFieldDto,
    entityDefinition: EntityDefinition,
    selectorSource?: EntityDefinition | undefined,
  ): Promise<EntityField> {
    const newEntityField = this.create({
      name: createEntityFieldDto.name,
      type: createEntityFieldDto.type,
      required: createEntityFieldDto.required,
      requiredText: createEntityFieldDto.requiredText,
      entityDefinition,
      selectorSource,
      label: createEntityFieldDto.label,
      placeholder: createEntityFieldDto.placeholder,
      description: createEntityFieldDto.description,
      createPage: createEntityFieldDto.createPage,
      editPage: createEntityFieldDto.editPage,
      editPageDisabled: createEntityFieldDto.editPageDisabled,
    });
    try {
      await this.save(newEntityField);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.ENTITY_FIELD);
    }
    return this.findOneByIdWithRelations(newEntityField.id, ["entityDefinition", "selectorSource"]);
  }

  async updateByIdWithRelations(
    id: string,
    updateEntityFieldDto: UpdateEntityFieldDto,
    relations: string[] = [],
    selectorSource?: EntityDefinition | undefined,
  ): Promise<EntityField> {
    await this.update(
      { id },
      {
        name: updateEntityFieldDto.name,
        type: updateEntityFieldDto.type,
        required: updateEntityFieldDto.required,
        requiredText: updateEntityFieldDto.requiredText,
        selectorSource,
        label: updateEntityFieldDto.label,
        placeholder: updateEntityFieldDto.placeholder,
        description: updateEntityFieldDto.description,
        createPage: updateEntityFieldDto.createPage,
        editPage: updateEntityFieldDto.editPage,
        editPageDisabled: updateEntityFieldDto.editPageDisabled,
      },
    );
    return this.findOneByIdWithRelations(id, relations);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete({ id });
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
    entityDefinitionId: string,
  ): Promise<{ entities: EntityField[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("entityField");

    queryBuilder
      .leftJoinAndSelect("entityField.entityDefinition", "entityDefinition")
      .where("entityDefinition.id = :entityDefinitionId", { entityDefinitionId })
      .orderBy("entityField.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("entityField.name LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByIdWithRelations(id: string, relations: string[] = []): Promise<EntityField> {
    return this.findOne({
      where: { id },
      relations,
    });
  }

  findOneByID(id: string): Promise<EntityField> {
    return this.findOne({
      where: { id },
    });
  }
}
