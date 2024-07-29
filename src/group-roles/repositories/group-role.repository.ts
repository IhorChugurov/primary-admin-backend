import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { GroupRole } from "../entities/group-role.entity";
import { CreateGroupRoleDto } from "../dto/create-group-role.dto";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";

@Injectable()
export class GroupRoleRepository extends Repository<GroupRole> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(GroupRole, dataSource.createEntityManager());
  }

  async createAndSave(createGroupRoleDto: CreateGroupRoleDto): Promise<GroupRole> {
    const newGroupRole = this.create({
      name: createGroupRoleDto.name,
      description: createGroupRoleDto.description,
      project: createGroupRoleDto.project,
    });
    try {
      await this.save(newGroupRole);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.GROUP_ROLE);
    }
    return this.findOneByIdWithRelations(newGroupRole.id, createGroupRoleDto.project.id, [
      "project",
    ]);
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<GroupRole> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }

  findAllWithRelations(projectId: string, relations: string[] = []): Promise<GroupRole[]> {
    return this.find({ where: { project: { id: projectId } }, relations });
  }
}
