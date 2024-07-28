import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./repositories/project.repository";
import { GroupRolesModule } from "src/group-roles/group-roles.module";
import { FacilityRolesModule } from "src/facility-roles/facility-roles.module";

@Module({
  imports: [TypeOrmModule.forFeature([Project]), GroupRolesModule, FacilityRolesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
