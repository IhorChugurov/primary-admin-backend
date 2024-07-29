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
import { GroupUserDto } from "./dto/group-user.dto";
import { GroupUser } from "./entities/group-user.entity";
import { UpdateGroupUserDto } from "./dto/update-group-user.dto";
import { GroupUserListDto } from "./dto/group-user-list.dto";

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
    const groupRole = await this.groupRolesService.findOne(
      createGroupUserDto.groupRoleId,
      projectId,
    );
    const project = await this.projectsService.findOne(projectId);
    return this.groupUserRepository.createAndSave(user, group, groupRole, project);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
  ): Promise<PaginationDto<GroupUserListDto>> {
    const { entities, totalItems } =
      await this.groupUserRepository.findManyWithPaginationAndRelations(
        paginationOptionsDto,
        projectId,
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

  async update(
    groupUserId: string,
    updateGroupUserDto: UpdateGroupUserDto,
    projectId: string,
  ): Promise<GroupUser> {
    const groupRole = await this.groupRolesService.findOne(
      updateGroupUserDto.groupRoleId,
      projectId,
    );
    const groupUser = await this.groupUserRepository.findOneByID(groupUserId, projectId);
    if (!groupUser) {
      throw new NotFoundException(`Group admin with ID #${groupUserId} not found`);
    }
    return this.groupUserRepository.updateByIdWithRelations(groupUserId, groupRole, projectId, [
      "user",
      "group",
      "groupRole",
      "project",
    ]);
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
