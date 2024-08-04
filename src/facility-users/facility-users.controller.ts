import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { FacilityUsersService } from "./facility-users.service";
import { CreateFacilityUserDto } from "./dto/create-facility-user.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { FacilityUserDto } from "./dto/facility-user.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { ProjectId } from "src/projects/decorators/project-id.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { FacilityUserListDto } from "./dto/facility-user-list.dto";
import { FacilityUserQueryDto } from "./dto/faciltiy-user-query.dto";

@Roles("SuperAdmin", "Admin")
@Controller("facility-users")
export class FacilityUsersController {
  constructor(private readonly facilityUsersService: FacilityUsersService) {}

  @UseDto(FacilityUserDto)
  @Post()
  create(
    @Body() createFacilityUserDto: CreateFacilityUserDto,
    @ProjectId() projectId: string,
  ): Promise<FacilityUserDto> {
    return this.facilityUsersService.create(createFacilityUserDto, projectId);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @ProjectId() projectId: string,
    @Query() query: FacilityUserQueryDto,
  ): Promise<PaginationDto<FacilityUserListDto>> {
    return this.facilityUsersService.findMany(paginationOptionsDto, projectId, query);
  }

  @UseDto(FacilityUserDto)
  @Get(":id")
  findOne(
    @Param("id") facilityUserId: string,
    @ProjectId() projectId: string,
  ): Promise<FacilityUserDto> {
    return this.facilityUsersService.findOne(facilityUserId, projectId);
  }

  @Delete(":id")
  remove(
    @Param("id") facilityUserId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.facilityUsersService.remove(facilityUserId, projectId);
  }
}
