import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupDto } from "./dto/group.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Roles("SuperAdmin", "Admin")
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseDto(GroupDto)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  async findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<GroupDto>> {
    const result = await this.groupsService.findMany(paginationOptionsDto);
    console.log(result);
    return result;
  }

  @UseDto(GroupDto)
  @Get(":id")
  findOne(@Param("id") groupId: string): Promise<GroupDto> {
    return this.groupsService.findOne(groupId);
  }

  @UseDto(GroupDto)
  @Patch(":id")
  update(@Param("id") groupId: string, @Body() updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    return this.groupsService.update(groupId, updateGroupDto);
  }

  @UseDto(GroupDto)
  @Delete(":id")
  remove(@Param("id") groupId: string): Promise<ResponseMessage> {
    return this.groupsService.remove(groupId);
  }
}
