import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { Environment } from "../entities/environment.entity";
import { CreateEnvironmentDto } from "../dto/create-environment.dto";
import { UpdateEnvironmentDto } from "../dto/update-environment.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { Project } from "src/projects/entities/project.entity";
import { EnvironmentDestinations } from "../enums/evironment-destination.enum";

@Injectable()
export class EnvironmentRepository extends Repository<Environment> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Environment, dataSource.createEntityManager());
  }

  async createAndSave(
    createEnvironmentDto: CreateEnvironmentDto,
    project: Project,
  ): Promise<Environment> {
    const newEnvironment = this.create({
      key: createEnvironmentDto.key,
      valueType: createEnvironmentDto.valueType,
      destination: createEnvironmentDto.destination,
      label: createEnvironmentDto.label,
      placeholder: createEnvironmentDto.placeholder,
      description: createEnvironmentDto.description,
      project,
    });
    try {
      await this.save(newEnvironment);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.ENVIRONMENT);
    }
    return this.findOneByIdWithRelations(newEnvironment.id, project.id, ["project"]);
  }

  async updateByIdWithRelations(
    id: string,
    updateEnvironmentDto: UpdateEnvironmentDto,
    projectId: string,
    relations: string[] = [],
  ): Promise<Environment> {
    await this.update(
      { id, project: { id: projectId } },
      {
        key: updateEnvironmentDto.key,
        label: updateEnvironmentDto.label,
        placeholder: updateEnvironmentDto.placeholder,
        description: updateEnvironmentDto.description,
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
  ): Promise<{ entities: Environment[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("environment");

    queryBuilder
      .leftJoinAndSelect("environment.project", "project")
      .where("project.id = :projectId", { projectId })
      .orderBy("environment.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("environment.key LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findAll(projectId: string): Promise<Environment[]> {
    return this.find({ where: { project: { id: projectId } } });
  }

  findAllFirstAdminEnvironments(projectId: string): Promise<Environment[]> {
    return this.find({
      where: { project: { id: projectId }, destination: EnvironmentDestinations.FIRST },
    });
  }

  findAllProjectEnvironments(projectId: string): Promise<Environment[]> {
    return this.find({
      where: { project: { id: projectId }, destination: EnvironmentDestinations.PROJECT },
    });
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<Environment> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }

  findOneByID(id: string, projectId: string): Promise<Environment> {
    return this.findOne({
      where: { id, project: { id: projectId } },
    });
  }
}
