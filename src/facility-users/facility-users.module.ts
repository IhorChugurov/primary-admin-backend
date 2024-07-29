import { Module } from "@nestjs/common";
import { FacilityUsersService } from "./facility-users.service";
import { FacilityUsersController } from "./facility-users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacilityUser } from "./entities/facility-user.entity";
import { UsersModule } from "src/users/users.module";
import { FacilitiesModule } from "src/facilities/facilities.module";
import { FacilityRolesModule } from "src/facility-roles/facility-roles.module";
import { ProjectsModule } from "src/projects/projects.module";
import { FacilityUserRepository } from "./repositories/facility-user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilityUser]),
    UsersModule,
    FacilitiesModule,
    FacilityRolesModule,
    ProjectsModule,
  ],
  controllers: [FacilityUsersController],
  providers: [FacilityUsersService, FacilityUserRepository],
})
export class FacilityUsersModule {}
