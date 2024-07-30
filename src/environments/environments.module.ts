import { Module } from "@nestjs/common";
import { EnvironmentsService } from "./environments.service";
import { EnvironmentsController } from "./environments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Environment } from "./entities/environment.entity";
import { ProjectsModule } from "src/projects/projects.module";
import { EnvironmentRepository } from "./repositories/environment.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Environment]), ProjectsModule],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService, EnvironmentRepository],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
