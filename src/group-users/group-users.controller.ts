import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { GroupUsersService } from "./group-users.service";
import { CreateGroupUserDto } from "./dto/create-group-user.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupUserDto } from "./dto/group-user.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { GroupUserListDto } from "./dto/group-user-list.dto";
import { EntityType } from "src/common/enums/entity-type.enum";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { GroupId } from "src/common/decorators/group-id-query.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.GROUP_USER)
@Controller("group-users")
export class GroupUsersController {
  constructor(private readonly groupUsersService: GroupUsersService) {}

  @UseDto(GroupUserDto)
  @Post()
  create(
    @Body() createGroupUserDto: CreateGroupUserDto,
    @ProjectId() projectId: string,
  ): Promise<GroupUserDto> {
    return this.groupUsersService.create(createGroupUserDto, projectId);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @ProjectId() projectId: string,
    @GroupId() groupId: string,
  ): Promise<PaginationDto<GroupUserListDto>> {
    return this.groupUsersService.findMany(paginationOptionsDto, projectId, groupId);
  }

  @UseDto(GroupUserDto)
  @Get(":id")
  findOne(@UUIDParam() groupUserId: string, @ProjectId() projectId: string): Promise<GroupUserDto> {
    return this.groupUsersService.findOne(groupUserId, projectId);
  }

  @Delete(":id")
  remove(
    @UUIDParam() groupUserId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.groupUsersService.remove(groupUserId, projectId);
  }
}
