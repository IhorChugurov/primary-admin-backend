import { Module } from "@nestjs/common";
import { FacilityRolesService } from "./facility-roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacilityRole } from "./entities/facility-role.entity";
import { FacilityRoleRepository } from "./repositories/facility-role.repository";
import { FacilityRolesController } from "./facility-roles.controller";

@Module({
  imports: [TypeOrmModule.forFeature([FacilityRole])],
  controllers: [FacilityRolesController],
  providers: [FacilityRolesService, FacilityRoleRepository],
  exports: [FacilityRolesService],
})
export class FacilityRolesModule {}
