import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectRepository } from "./repositories/project.repository";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { Project } from "./entities/project.entity";
import { GroupRolesService } from "src/group-roles/group-roles.service";
import { FacilityRolesService } from "src/facility-roles/facility-roles.service";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly groupRolesService: GroupRolesService,
    private readonly facilityRolesService: FacilityRolesService,
  ) {}

  // Also using for seeding
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = await this.projectRepository.createAndSave(createProjectDto);
    await this.groupRolesService.createDefaultGroupRoles(newProject);
    await this.facilityRolesService.createDefaultFacilityRoles(newProject);
    return newProject;
  }

  // Also using for seeding
  findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async findOne(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOneByID(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID #${projectId} not found`);
    }
    return project;
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOneByID(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID #${project} not found`);
    }
    return this.projectRepository.updateById(projectId, updateProjectDto);
  }

  async remove(projectId: string): Promise<ResponseMessage> {
    const project = await this.projectRepository.findOneByID(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID #${projectId} not found`);
    }
    await this.projectRepository.removeByEntity(project);
    return {
      message: `Project with ID #${projectId} has been deleted successfully`,
    };
  }

  // For seeding
  async updateDefaultProject(
    primaryRoleId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<void> {
    return this.projectRepository.updateDescriptionById(primaryRoleId, updateProjectDto);
  }
}
