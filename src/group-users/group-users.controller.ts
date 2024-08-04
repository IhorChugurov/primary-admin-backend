import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { GroupUsersService } from "./group-users.service";
import { CreateGroupUserDto } from "./dto/create-group-user.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupUserDto } from "./dto/group-user.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { ProjectId } from "src/projects/decorators/project-id.decorator";
import { GroupUserListDto } from "./dto/group-user-list.dto";
import { GroupUserQueryDto } from "./dto/group-user-query.dto";

@Roles("SuperAdmin", "Admin")
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
    @Query() query: GroupUserQueryDto,
  ): Promise<PaginationDto<GroupUserListDto>> {
    return this.groupUsersService.findMany(paginationOptionsDto, projectId, query);
  }

  @UseDto(GroupUserDto)
  @Get(":id")
  findOne(@Param("id") groupUserId: string, @ProjectId() projectId: string): Promise<GroupUserDto> {
    return this.groupUsersService.findOne(groupUserId, projectId);
  }

  @Delete(":id")
  remove(
    @Param("id") groupUserId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.groupUsersService.remove(groupUserId, projectId);
  }
}
