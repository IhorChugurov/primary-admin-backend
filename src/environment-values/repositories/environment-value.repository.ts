import { IsNull, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { EnvironmentValue } from "../entities/environment-value.entity";
import { Project } from "src/projects/entities/project.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";

@Injectable()
export class EnvironmentValueRepository extends Repository<EnvironmentValue> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(EnvironmentValue, dataSource.createEntityManager());
  }

  async createAndSave(
    value: any,
    environment: Environment,
    project: Project,
    facility?: Facility,
  ): Promise<EnvironmentValue> {
    const newEnvironmentValue = this.create({
      value,
      environment,
      project,
      facility: facility || null,
    });
    try {
      await this.save(newEnvironmentValue);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.ENVIRONMENT_VALUE);
    }
    if (facility) {
      return this.findOneByIdWithRelations(newEnvironmentValue.id, project.id, [
        "environment",
        "facility",
        "project",
      ]);
    } else {
      return this.findOneByIdWithRelations(newEnvironmentValue.id, project.id, [
        "environment",
        "project",
      ]);
    }
  }

  findAllFacilityValuesWithRelations(
    projectId: string,
    facilityId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue[]> {
    return this.find({
      where: { project: { id: projectId }, facility: { id: facilityId } },
      relations,
    });
  }

  findAllProjectValuesWithRelations(
    projectId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue[]> {
    return this.find({
      where: { project: { id: projectId }, facility: IsNull() },
      relations,
    });
  }

  findOneFacilityValueWithRelations(
    environmentId: string,
    facilityId: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue> {
    return this.findOne({
      where: {
        environment: { id: environmentId },
        facility: { id: facilityId },
        project: { id: projectId },
      },
      relations,
    });
  }

  findOneProjectValueWithRelations(
    environmentId: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue> {
    return this.findOne({
      where: {
        environment: { id: environmentId },
        facility: IsNull(),
        project: { id: projectId },
      },
      relations,
    });
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }

  async updateByIdWithRelations(
    id: string,
    value: any,
    projectId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue> {
    await this.update(
      { id, project: { id: projectId } },
      {
        value,
      },
    );
    return this.findOneByIdWithRelations(id, projectId, relations);
  }
}
