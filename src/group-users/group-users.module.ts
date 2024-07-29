import { Module } from "@nestjs/common";
import { GroupUsersService } from "./group-users.service";
import { GroupUsersController } from "./group-users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupUser } from "./entities/group-user.entity";
import { UsersModule } from "src/users/users.module";
import { GroupRolesModule } from "src/group-roles/group-roles.module";
import { ProjectsModule } from "src/projects/projects.module";
import { GroupUserRepository } from "./repositories/group-user.repository";
import { GroupsModule } from "src/groups/groups.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupUser]),
    UsersModule,
    GroupsModule,
    GroupRolesModule,
    ProjectsModule,
  ],
  controllers: [GroupUsersController],
  providers: [GroupUsersService, GroupUserRepository],
})
export class GroupUsersModule {}
