import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRoleRepository } from "./repositories/group-role.repository";
import { GroupRole } from "./entities/group-role.entity";
import { predefinedGroupRoles } from "./constants/group-roles.constant";
import { Project } from "src/projects/entities/project.entity";

@Injectable()
export class GroupRolesService {
  constructor(private readonly groupRoleRepository: GroupRoleRepository) {}

  async createDefaultGroupRoles(project: Project): Promise<void> {
    for (const predefinedGroupRole of predefinedGroupRoles) {
      await this.groupRoleRepository.createAndSave({
        name: predefinedGroupRole.name,
        description: predefinedGroupRole.description,
        project,
      });
    }
  }

  findAll(projectId: string): Promise<GroupRole[]> {
    return this.groupRoleRepository.findAllWithRelations(projectId, ["project"]);
  }

  async findOne(groupRoleId: string, projectId: string): Promise<GroupRole> {
    const groupRole = await this.groupRoleRepository.findOneByIdWithRelations(
      groupRoleId,
      projectId,
      ["project"],
    );
    if (!groupRole) {
      throw new NotFoundException(`Group role with ID #${groupRoleId} not found`);
    }
    return groupRole;
  }

  async findOneByName(groupRoleName: string, projectId: string): Promise<GroupRole> {
    const groupRole = await this.groupRoleRepository.findOneByName(groupRoleName, projectId);
    if (!groupRole) {
      throw new NotFoundException(`Group role with name #${groupRoleName} not found`);
    }
    return groupRole;
  }
}
