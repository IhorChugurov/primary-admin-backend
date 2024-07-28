import { Injectable, NotFoundException } from "@nestjs/common";
import { FacilityRoleRepository } from "./repositories/facility-role.repository";
import { FacilityRole } from "./entities/facility-role.entity";
import { Project } from "src/projects/entities/project.entity";
import { predefinedFacilityRoles } from "./constants/facility-roles.constant";

@Injectable()
export class FacilityRolesService {
  constructor(private readonly facilityRoleRepository: FacilityRoleRepository) {}

  async createDefaultFacilityRoles(project: Project): Promise<void> {
    for (const predefinedFacilityRole of predefinedFacilityRoles) {
      await this.facilityRoleRepository.createAndSave({
        name: predefinedFacilityRole.name,
        description: predefinedFacilityRole.description,
        project,
      });
    }
  }

  findAll(): Promise<FacilityRole[]> {
    return this.facilityRoleRepository.findAllWithRelations(["project"]);
  }

  async findOne(facilityId: string): Promise<FacilityRole> {
    const facilityRole = await this.facilityRoleRepository.findOneByIdWithRelations(facilityId, [
      "project",
    ]);
    if (!facilityRole) {
      throw new NotFoundException(`Facility role with ID #${facilityId} not found`);
    }
    return facilityRole;
  }
}
