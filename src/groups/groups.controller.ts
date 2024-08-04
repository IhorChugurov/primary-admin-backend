import { Controller, Get, Post, Body, Patch, Delete, Query } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { GroupDto } from "./dto/group.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { GroupFacilitiesDto } from "./dto/group-facilities.dto";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.GROUP)
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
  ): Promise<PaginationDto<GroupFacilitiesDto>> {
    const result = await this.groupsService.findManyWithFacilities(paginationOptionsDto);
    return result;
  }

  @UseDto(GroupDto)
  @Get(":id")
  findOne(@UUIDParam() groupId: string): Promise<GroupDto> {
    return this.groupsService.findOne(groupId);
  }

  @UseDto(GroupDto)
  @Patch(":id")
  update(@UUIDParam() groupId: string, @Body() updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    return this.groupsService.update(groupId, updateGroupDto);
  }

  @Delete(":id")
  remove(@UUIDParam() groupId: string): Promise<ResponseMessage> {
    return this.groupsService.remove(groupId);
  }
}
