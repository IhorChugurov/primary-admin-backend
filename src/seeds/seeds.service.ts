import { Injectable } from "@nestjs/common";
import { UsersSeedService } from "./user-seed.service";
import { PrimaryRolesSeedService } from "./primary-role-seed.service";
import { PrimaryUsersSeedService } from "./primary-user-seed.service";
import { ProjectsSeedService } from "./project-seed.service";

@Injectable()
export class SeedService {
  constructor(
    private readonly primaryRolesSeedService: PrimaryRolesSeedService,
    private readonly primaryUsersSeedService: PrimaryUsersSeedService,
    private readonly usersSeedService: UsersSeedService,
    private readonly projectsSeedService: ProjectsSeedService,
    // private readonly groupRolesSeedService: GroupRolesSeedService,
    // private readonly facilityRolesRoleSeedService: FacilityRolesRoleSeedService,
  ) {}

  async seed() {
    const roles = await this.primaryRolesSeedService.seedRoles();
    const user = await this.usersSeedService.seedUser();
    await this.primaryUsersSeedService.seedPrimaryUser(user, roles);
    await this.projectsSeedService.seedProjects();
    // await this.groupRolesSeedService.seedGroupRoles(user, roles);
    // await this.facilityRolesRoleSeedService.seedFacilityRoles(user, roles);
  }
}
