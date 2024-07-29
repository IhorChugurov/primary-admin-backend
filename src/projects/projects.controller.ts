import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { ProjectDto } from "./dto/project.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";

@Roles("SuperAdmin", "Admin")
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
  findOne(@Param("id") projectId: string): Promise<ProjectDto> {
    return this.projectsService.findOne(projectId);
  }

  @UseDto(ProjectDto)
  @Patch(":id")
  update(
    @Param("id") projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectsService.update(projectId, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") projectId: string): Promise<ResponseMessage> {
    return this.projectsService.remove(projectId);
  }
}
