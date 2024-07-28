import { Module } from "@nestjs/common";
import { PrimaryRolesService } from "./primary-roles.service";
import { PrimaryRolesController } from "./primary-roles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrimaryRole } from "./entities/primary-role.entity";
import { PrimaryRoleRepository } from "./repositories/primary-role.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PrimaryRole])],
  controllers: [PrimaryRolesController],
  providers: [PrimaryRolesService, PrimaryRoleRepository],
  exports: [PrimaryRolesService],
})
export class PrimaryRolesModule {}
