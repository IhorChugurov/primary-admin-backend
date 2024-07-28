import { Injectable, Logger } from "@nestjs/common";
import { predefinedProjects } from "src/projects/constants/projects.constant";
import { ProjectsService } from "src/projects/projects.service";

@Injectable()
export class ProjectsSeedService {
  private readonly logger = new Logger(ProjectsSeedService.name);

  constructor(private readonly projectsService: ProjectsService) {}

  async seedProjects(): Promise<void> {
    const existingProjects = await this.projectsService.findAll();
    const existingProjectsMap = new Map(existingProjects.map((role) => [role.name, role]));

    for (const project of predefinedProjects) {
      let existingProject = existingProjectsMap.get(project.name);

      if (!existingProject) {
        // Creating a new project
        await this.projectsService.create({
          name: project.name,
          description: project.description,
        });
        this.logger.log(`Project #${project.name} has been created.`);
      } else {
        if (existingProject.description !== project.description) {
          // Updating the description of an existing Project
          await this.projectsService.updateDefaultProject(existingProject.id, {
            description: project.description,
          });
          this.logger.log(`Project #${project.name} description has been updated.`);
        } else {
          this.logger.log(
            `project #${project.name} already exists and the description is up-to-date.`,
          );
        }
      }
    }
  }
}
