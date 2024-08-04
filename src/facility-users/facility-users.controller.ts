import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { FacilityUsersService } from "./facility-users.service";
import { CreateFacilityUserDto } from "./dto/create-facility-user.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { FacilityUserDto } from "./dto/facility-user.dto";
import { UseDto } from "src/common/decorators/dto.decorator";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { FacilityUserListDto } from "./dto/facility-user-list.dto";
import { EntityType } from "src/common/enums/entity-type.enum";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { ProjectId } from "src/common/decorators/project-id-header.decorator";
import { FacilityId } from "src/common/decorators/facility-id-query.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.FACILITY_USER)
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
    @FacilityId() facilityId: string,
  ): Promise<PaginationDto<FacilityUserListDto>> {
    return this.facilityUsersService.findMany(paginationOptionsDto, projectId, facilityId);
  }

  @UseDto(FacilityUserDto)
  @Get(":id")
  findOne(
    @UUIDParam() facilityUserId: string,
    @ProjectId() projectId: string,
  ): Promise<FacilityUserDto> {
    return this.facilityUsersService.findOne(facilityUserId, projectId);
  }

  @Delete(":id")
  remove(
    @UUIDParam() facilityUserId: string,
    @ProjectId() projectId: string,
  ): Promise<ResponseMessage> {
    return this.facilityUsersService.remove(facilityUserId, projectId);
  }
}
