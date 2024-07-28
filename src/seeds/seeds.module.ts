import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { UsersSeedService } from "./user-seed.service";
import { PrimaryRolesSeedService } from "./primary-role-seed.service";
import { SeedService } from "./seeds.service";
import { PrimaryUsersSeedService } from "./primary-user-seed.service";
import { UsersModule } from "src/users/users.module";
import { PrimaryRolesModule } from "src/primary-roles/primary-roles.module";
import { PrimaryUsersModule } from "src/primary-users/primary-users.module";
import { ProjectsModule } from "src/projects/projects.module";
import { ProjectsSeedService } from "./project-seed.service";

@Module({
  imports: [SharedModule, UsersModule, PrimaryRolesModule, PrimaryUsersModule, ProjectsModule],
  providers: [
    PrimaryRolesSeedService,
    UsersSeedService,
    PrimaryUsersSeedService,
    ProjectsSeedService,
    SeedService,
  ],
  exports: [SeedService],
})
export class SeedModule {}
