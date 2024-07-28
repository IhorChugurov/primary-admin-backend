import { Module } from "@nestjs/common";
import { FacilitiesService } from "./facilities.service";
import { FacilitiesController } from "./facilities.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Facility } from "./entities/facility.entity";
import { FacilityRepository } from "./repositories/facility.repository";
import { GroupsModule } from "src/groups/groups.module";

@Module({
  imports: [TypeOrmModule.forFeature([Facility]), GroupsModule],
  controllers: [FacilitiesController],
  providers: [FacilitiesService, FacilityRepository],
})
export class FacilitiesModule {}
