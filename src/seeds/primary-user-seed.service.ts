import { Injectable, Logger } from "@nestjs/common";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { PrimaryUsersService } from "src/primary-users/primary-users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class PrimaryUsersSeedService {
  private readonly logger = new Logger(PrimaryUsersSeedService.name);

  constructor(private readonly primaryUsersService: PrimaryUsersService) {}

  async seedPrimaryUser(user: User, roles: PrimaryRole[]): Promise<void> {
    const superAdminRole = roles.find((role) => role.name === "SuperAdmin");
    const adminRole = roles.find((role) => role.name === "Admin");

    // Checking if there is an existing SuperAdmin
    const existingSuperAdmin =
      await this.primaryUsersService.findOneByPrimaryRoleIdWithRelationsSeed(superAdminRole.id, [
        "user",
      ]);

    if (existingSuperAdmin && existingSuperAdmin.user.id !== user.id) {
      // Changing the existing PrimaryUser's SuperAdmin role to Admin role
      await this.primaryUsersService.updatePrimaryRoleById(existingSuperAdmin.id, {
        primaryRole: adminRole,
      });
      this.logger.log(
        `Existing SuperAdmin role has been changed to Admin for the PrimaryUser with ID #${existingSuperAdmin.user.id}.`,
      );
    }

    // Checking if the passed user already has a PrimaryUser
    const existingPrimaryUser = await this.primaryUsersService.findOneByUserIdWithRelationsSeed(
      user.id,
      ["primaryRole"],
    );

    if (existingPrimaryUser) {
      // Checking if the existing PrimaryUser already has the SuperAdmin role
      if (existingPrimaryUser.primaryRole.id === superAdminRole.id) {
        this.logger.log(
          `PrimaryUser with ID #${existingPrimaryUser.id} already has the SuperAdmin role.`,
        );
        return;
      }
      // Updating the PrimaryUser role to SuperAdmin
      await this.primaryUsersService.updatePrimaryRoleById(existingPrimaryUser.id, {
        primaryRole: superAdminRole,
      });
      this.logger.log(
        `PrimaryRole has been updated to SuperAdmin for PrimaryUser with ID #${existingPrimaryUser.id}.`,
      );
    } else {
      // Creating a new PrimaryUser with SuperAdmin role
      await this.primaryUsersService.createDefaultPrimaryUser({
        user,
        primaryRole: superAdminRole,
      });
      this.logger.log(
        `New PrimaryUser with SuperAdmin role has been created for user with ID #${user.id}.`,
      );
    }
  }
}
