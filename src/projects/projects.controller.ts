import { Controller, Get, Post, Body, Patch, Delete } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { ProjectDto } from "./dto/project.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { EntityType } from "src/common/enums/entity-type.enum";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.PROJECT)
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseDto(ProjectDto)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return this.projectsService.create(createProjectDto);
  }

  @UseDto(ProjectDto)
  @Get()
  findAll(): Promise<ProjectDto[]> {
    return this.projectsService.findAll();
  }

  @UseDto(ProjectDto)
  @Get(":id")
  findOne(@UUIDParam() projectId: string): Promise<ProjectDto> {
    console.log("hello1");
    return this.projectsService.findOne(projectId);
  }

  @UseDto(ProjectDto)
  @Patch(":id")
  update(
    @UUIDParam() projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(projectId, updateProjectDto);
  }

  @Delete(":id")
  remove(@UUIDParam() projectId: string): Promise<ResponseMessage> {
    return this.projectsService.remove(projectId);
  }
}
