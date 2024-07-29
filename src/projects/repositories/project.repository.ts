import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { Project } from "../entities/project.entity";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createAndSave(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.create({
      name: createProjectDto.name,
      description: createProjectDto.description,
    });
    try {
      return await this.save(newProject);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.PROJECT);
    }
  }

  async updateById(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    try {
      await this.update(id, {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
      });
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.PROJECT);
    }
    return this.findOneByID(id);
  }

  removeByEntity(project: Project): Promise<Project> {
    return this.remove(project);
  }

  findAll(): Promise<Project[]> {
    return this.find();
  }

  findOneByName(name: string): Promise<Project> {
    return this.findOne({
      where: { name },
    });
  }

  findOneByID(id: string): Promise<Project> {
    return this.findOne({
      where: { id },
    });
  }

  async updateDescriptionById(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    await this.update(id, {
      description: updateProjectDto.description,
    });
  }
}
