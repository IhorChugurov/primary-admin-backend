import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { GroupUserRepository } from "./repositories/group-user.repository";
import { GroupsService } from "src/groups/groups.service";
import { GroupRolesService } from "src/group-roles/group-roles.service";
import { ProjectsService } from "src/projects/projects.service";
import { CreateGroupUserDto } from "./dto/create-group-user.dto";
import { GroupUser } from "./entities/group-user.entity";
import { GroupUserListDto } from "./dto/group-user-list.dto";
import { predefinedGroupRoles } from "src/group-roles/constants/group-roles.constant";
import { GroupUserQueryDto } from "./dto/group-user-query.dto";

@Injectable()
export class GroupUsersService {
  constructor(
    private readonly groupUserRepository: GroupUserRepository,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly groupRolesService: GroupRolesService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createGroupUserDto: CreateGroupUserDto, projectId: string): Promise<GroupUser> {
    const user = await this.usersService.findOrCreate(createGroupUserDto.email);
    const group = await this.groupsService.findOne(createGroupUserDto.groupId);
    const project = await this.projectsService.findOne(projectId);
    const adminGroupRole = predefinedGroupRoles.find((groupRole) => groupRole.name === "Admin");
    const groupRole = await this.groupRolesService.findOneByName(adminGroupRole.name, projectId);
    return this.groupUserRepository.createAndSave(user, group, groupRole, project);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
    query: GroupUserQueryDto,
  ): Promise<PaginationDto<GroupUserListDto>> {
    const { entities, totalItems } =
      await this.groupUserRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        projectId,
        query.groupId,
      );

    const groupUserDtos = plainToInstance(GroupUserListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(groupUserDtos, paginationMetaDto);
  }

  async findOne(groupUserId: string, projectId: string): Promise<GroupUser> {
    const groupUser = await this.groupUserRepository.findOneByIdWithRelations(
      groupUserId,
      projectId,
      ["user", "group", "groupRole", "project"],
    );
    if (!groupUser) {
      throw new NotFoundException(`Group admin with ID #${groupUser} not found`);
    }
    return groupUser;
  }

  async remove(groupUserId: string, projectId: string): Promise<ResponseMessage> {
    const groupUser = await this.groupUserRepository.findOneByID(groupUserId, projectId);
    if (!groupUser) {
      throw new NotFoundException(`Group admin with ID #${groupUserId} not found`);
    }
    await this.groupUserRepository.deleteById(groupUserId, projectId);
    return {
      message: `Group admin with ID #${groupUserId} has been deleted successfully`,
    };
  }
}
