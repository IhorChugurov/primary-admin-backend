import { Injectable } from "@nestjs/common";
import { EnvironmentValueRepository } from "./repositories/environment-value.repository";
import { EnvironmentValue } from "./entities/environment-value.entity";
import { ProjectsService } from "src/projects/projects.service";
import { FacilitiesService } from "src/facilities/facilities.service";

@Injectable()
export class EnvironmentValuesService {
  constructor(
    private readonly environmentValueRepository: EnvironmentValueRepository,
    private readonly projectsService: ProjectsService,
    private readonly facilitiesService: FacilitiesService,
  ) {}
  async findAll(projectId: string, facilityId: string): Promise<EnvironmentValue[]> {
    const project = await this.projectsService.findOne(projectId);
    const facility = await this.facilitiesService.findOne(facilityId);
    return this.environmentValueRepository.findAllWithRelations(projectId, facilityId);
  }
}
