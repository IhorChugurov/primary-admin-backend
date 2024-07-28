import { Module } from "@nestjs/common";
import { GroupRolesService } from "./group-roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupRole } from "./entities/group-role.entity";
import { GroupRoleRepository } from "./repositories/group-role.repository";
import { GroupRolesController } from "./group-roles.controller";

@Module({
  imports: [TypeOrmModule.forFeature([GroupRole])],
  controllers: [GroupRolesController],
  providers: [GroupRolesService, GroupRoleRepository],
  exports: [GroupRolesService],
})
export class GroupRolesModule {}
