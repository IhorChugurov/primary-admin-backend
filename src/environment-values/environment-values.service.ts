import { Injectable } from "@nestjs/common";
import { EnvironmentValueRepository } from "./repositories/environment-value.repository";
import { ProjectsService } from "src/projects/projects.service";
import { FacilitiesService } from "src/facilities/facilities.service";
import { EnvironmentsService } from "src/environments/environments.service";
import { EnvironmentValue } from "./entities/environment-value.entity";
import { EnvironmentValueType } from "src/environments/enums/environment-value-type.enum";
import { EnvironmentWithValues } from "src/environments/interfaces/environment-with-value.interface";
import { UpdateManyEnvironmentValuesDto } from "./dto/update-many-environment-value.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Injectable()
export class EnvironmentValuesService {
  constructor(
    private readonly environmentValueRepository: EnvironmentValueRepository,
    private readonly environmentsService: EnvironmentsService,
    private readonly projectsService: ProjectsService,
    private readonly facilitiesService: FacilitiesService,
  ) {}
  async findAll(projectId: string, facilityId: string) {
    await this.projectsService.findOne(projectId);
    await this.facilitiesService.findOne(facilityId);
    const environments = await this.environmentsService.findAllFirstAdminEnvironments(projectId);
    const environmentValues = await this.environmentValueRepository.findAllWithRelations(
      projectId,
      facilityId,
      ["environment", "facility", "project"],
    );
    const environmentValueMap = new Map<string, EnvironmentValue>();
    environmentValues.forEach((envValue) => {
      environmentValueMap.set(envValue.environment.id, envValue);
    });

    const result = environments.map((environment) => {
      const environmentValue = environmentValueMap.get(environment.id);
      return {
        ...environment,
        value: environmentValue
          ? environmentValue.value
          : this.getDefaultValue(environment.valueType),
      } as EnvironmentWithValues;
    });

    return result;
  }

  async updateMany(
    projectId: string,
    updateManyDto: UpdateManyEnvironmentValuesDto,
  ): Promise<ResponseMessage> {
    const project = await this.projectsService.findOne(projectId);
    const facility = await this.facilitiesService.findOne(updateManyDto.facilityId);
    const { facilityId, items } = updateManyDto;

    for (const item of items) {
      for (const [environmentId, value] of Object.entries(item)) {
        const environment = await this.environmentsService.findOneWithRelations(
          environmentId,
          projectId,
        );

        if (
          !environment ||
          !this.isValidValueType(environment.valueType, value) ||
          environment.project.id !== projectId
        ) {
          continue;
        }

        const environmentValue = await this.environmentValueRepository.findOneWithRelations(
          environmentId,
          facilityId,
          projectId,
          ["environment", "facility", "project"],
        );

        if (environmentValue) {
          await this.environmentValueRepository.updateByIdWithRelations(
            environmentValue.id,
            value,
            projectId,
            ["environment", "facility", "project"],
          );
        } else {
          await this.environmentValueRepository.createAndSave(
            value,
            environment,
            facility,
            project,
          );
        }
      }
    }
    return {
      message: `Environment values has been updated successfully`,
    };
  }

  private isValidValueType(valueType: EnvironmentValueType, value: any): boolean {
    switch (valueType) {
      case EnvironmentValueType.BOOLEAN:
        return typeof value === "boolean";
      case EnvironmentValueType.STRING:
        return typeof value === "string";
      case EnvironmentValueType.NUMBER:
        return typeof value === "number";
      case EnvironmentValueType.DATE:
        return value instanceof Date;
      default:
        return false;
    }
  }

  private getDefaultValue(valueType: EnvironmentValueType): any {
    switch (valueType) {
      case EnvironmentValueType.BOOLEAN:
        return false;
      case EnvironmentValueType.NUMBER:
        return 0;
      case EnvironmentValueType.STRING:
        return "";
      case EnvironmentValueType.DATE:
        return new Date();
      default:
        return null;
    }
  }
}
