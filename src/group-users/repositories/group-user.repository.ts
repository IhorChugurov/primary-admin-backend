import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { GroupUser } from "../entities/group-user.entity";
import { Group } from "src/groups/entities/group.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
import { Project } from "src/projects/entities/project.entity";

@Injectable()
export class GroupUserRepository extends Repository<GroupUser> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(GroupUser, dataSource.createEntityManager());
  }

  async createAndSave(
    user: User,
    group: Group,
    groupRole: GroupRole,
    project: Project,
  ): Promise<GroupUser> {
    const newGroupUser = this.create({
      user,
      group,
      groupRole,
      project,
    });
    try {
      await this.save(newGroupUser);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.GROUP_USER);
    }
    return this.findOneByIdWithRelations(newGroupUser.id, project.id, [
      "user",
      "group",
      "groupRole",
      "project",
    ]);
  }

  async updateByIdWithRelations(
    id: string,
    groupRole: GroupRole,
    projectId: string,
    relations: string[] = [],
  ): Promise<GroupUser> {
    await this.update({ id, project: { id: projectId } }, { groupRole });
    return this.findOneByIdWithRelations(id, projectId, relations);
  }

  async deleteById(groupUserId: string, projectId: string): Promise<void> {
    await this.delete({ id: groupUserId, project: { id: projectId } });
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
    groupId: string,
  ): Promise<{ entities: GroupUser[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("groupUser");

    queryBuilder
      .leftJoinAndSelect("groupUser.user", "user")
      .leftJoinAndSelect("groupUser.group", "group")
      .leftJoinAndSelect("groupUser.groupRole", "groupRole")
      .leftJoinAndSelect("groupUser.project", "project")
      .where("project.id = :projectId", { projectId })
      .andWhere("group.id = :groupId", { groupId })
      .orderBy("groupUser.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("user.email LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByID(id: string, projectId: string): Promise<GroupUser> {
    return this.findOne({
      where: { id, project: { id: projectId } },
    });
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<GroupUser> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }
}
