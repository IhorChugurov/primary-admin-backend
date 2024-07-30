import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { ProjectsService } from "src/projects/projects.service";
import { EnvironmentRepository } from "./repositories/environment.repository";
import { CreateEnvironmentDto } from "./dto/create-environment.dto";
import { Environment } from "./entities/environment.entity";
import { EnvironmentListDto } from "./dto/environment-list.dto";
import { UpdateEnvironmentDto } from "./dto/update-environment.dto";

@Injectable()
export class EnvironmentsService {
  constructor(
    private readonly environmentRepository: EnvironmentRepository,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(
    createEnvironmentDto: CreateEnvironmentDto,
    projectId: string,
  ): Promise<Environment> {
    const project = await this.projectsService.findOne(projectId);
    return this.environmentRepository.createAndSave(createEnvironmentDto, project);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
  ): Promise<PaginationDto<EnvironmentListDto>> {
    const { entities, totalItems } =
      await this.environmentRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        projectId,
      );

    const environmentDtos = plainToInstance(EnvironmentListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(environmentDtos, paginationMetaDto);
  }

  findAllFirstAdminEnvironments(projectId: string): Promise<Environment[]> {
    return this.environmentRepository.findAllFirstAdminEnvironments(projectId);
  }

  async findOneWithRelations(environmentId: string, projectId: string): Promise<Environment> {
    const environment = await this.environmentRepository.findOneByIdWithRelations(
      environmentId,
      projectId,
      ["project"],
    );
    if (!environment) {
      throw new NotFoundException(`Environment with ID #${environmentId} not found`);
    }
    return environment;
  }

  async update(
    environmentId: string,
    updateEnvironmentDto: UpdateEnvironmentDto,
    projectId: string,
  ): Promise<Environment> {
    const environment = await this.environmentRepository.findOneByID(environmentId, projectId);
    if (!environment) {
      throw new NotFoundException(`Environment with ID #${environmentId} not found`);
    }
    return this.environmentRepository.updateByIdWithRelations(
      environmentId,
      updateEnvironmentDto,
      projectId,
      ["project"],
    );
  }

  async remove(environmentId: string, projectId: string): Promise<ResponseMessage> {
    const environment = await this.environmentRepository.findOneByID(environmentId, projectId);
    if (!environment) {
      throw new NotFoundException(`Environment admin with ID #${environmentId} not found`);
    }
    await this.environmentRepository.deleteById(environmentId, projectId);
    return {
      message: `Environment with ID #${environmentId} has been deleted successfully`,
    };
  }
}
