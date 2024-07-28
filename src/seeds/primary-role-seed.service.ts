import { Injectable, Logger } from "@nestjs/common";
import { predefinedRoles } from "src/primary-roles/constants/primary-roles.constant";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { PrimaryRolesService } from "src/primary-roles/primary-roles.service";

@Injectable()
export class PrimaryRolesSeedService {
  private readonly logger = new Logger(PrimaryRolesSeedService.name);

  constructor(private readonly primaryRolesService: PrimaryRolesService) {}

  async seedRoles(): Promise<PrimaryRole[]> {
    const roles: PrimaryRole[] = [];

    const existingRoles = await this.primaryRolesService.findAll();
    const existingRolesMap = new Map(existingRoles.map((role) => [role.name, role]));

    for (const role of predefinedRoles) {
      let existingPrimaryRole = existingRolesMap.get(role.name);

      if (!existingPrimaryRole) {
        // Creating a new primary role
        existingPrimaryRole = await this.primaryRolesService.createDefaultPrimaryRole({
          name: role.name,
          description: role.description,
        });
        this.logger.log(`PrimaryRole #${role.name} has been created.`);
      } else {
        if (existingPrimaryRole.description !== role.description) {
          // Updating the description of an existing PrimaryRole
          existingPrimaryRole = await this.primaryRolesService.updateDefaultPrimaryRole(
            existingPrimaryRole.id,
            { description: role.description },
          );
          this.logger.log(`Role #${role.name} description has been updated.`);
        } else {
          this.logger.log(`Role #${role.name} already exists and the description is up-to-date.`);
        }
      }
      roles.push(existingPrimaryRole);
    }

    return roles;
  }
}
