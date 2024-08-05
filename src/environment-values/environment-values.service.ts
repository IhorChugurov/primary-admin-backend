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
  async findAll(projectId: string, facilityId?: string) {
    await this.projectsService.findOne(projectId);
    if (facilityId) {
      await this.facilitiesService.findOne(facilityId);
    }
    let environments;
    if (facilityId) {
      environments = await this.environmentsService.findAllFirstAdminEnvironments(projectId);
    } else {
      environments = await this.environmentsService.findAllProjectEnvironments(projectId);
    }
    let environmentValues;
    if (facilityId) {
      environmentValues = await this.environmentValueRepository.findAllFacilityValuesWithRelations(
        projectId,
        facilityId,
        ["environment", "facility", "project"],
      );
    } else {
      environmentValues = await this.environmentValueRepository.findAllProjectValuesWithRelations(
        projectId,
        ["environment", "project"],
      );
    }
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
    updateManyEnvironmentValuesDto: UpdateManyEnvironmentValuesDto,
    facilityId?: string,
  ): Promise<ResponseMessage> {
    const project = await this.projectsService.findOne(projectId);
    let facility;
    if (facilityId) {
      facility = await this.facilitiesService.findOne(facilityId);
    }
    const { items } = updateManyEnvironmentValuesDto;

    for (const item of items) {
      const environment = await this.environmentsService.findOneWithRelations(item.key, projectId);

      if (!environment || !this.isValidValueType(environment.valueType, item.value)) {
        continue;
      }
      let environmentValue;
      if (facilityId) {
        environmentValue = await this.environmentValueRepository.findOneFacilityValueWithRelations(
          item.key,
          facilityId,
          projectId,
          ["environment", "facility", "project"],
        );
      } else {
        environmentValue = await this.environmentValueRepository.findOneProjectValueWithRelations(
          item.key,
          projectId,
          ["environment", "project"],
        );
      }

      if (environmentValue) {
        if (facilityId) {
          await this.environmentValueRepository.updateByIdWithRelations(
            environmentValue.id,
            item.value,
            projectId,
            ["environment", "facility", "project"],
          );
        } else {
          await this.environmentValueRepository.updateByIdWithRelations(
            environmentValue.id,
            item.value,
            projectId,
            ["environment", "project"],
          );
        }
      } else {
        await this.environmentValueRepository.createAndSave(
          item.value,
          environment,
          project,
          facility,
        );
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
