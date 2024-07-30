import { Module } from "@nestjs/common";
import { EnvironmentValuesService } from "./environment-values.service";
import { EnvironmentValuesController } from "./environment-values.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvironmentValue } from "./entities/environment-value.entity";
import { EnvironmentsModule } from "src/environments/environments.module";
import { FacilitiesModule } from "src/facilities/facilities.module";
import { ProjectsModule } from "src/projects/projects.module";
import { EnvironmentValueRepository } from "./repositories/environment-value.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([EnvironmentValue]),
    EnvironmentsModule,
    FacilitiesModule,
    ProjectsModule,
  ],
  controllers: [EnvironmentValuesController],
  providers: [EnvironmentValuesService, EnvironmentValueRepository],
})
export class EnvironmentValuesModule {}
