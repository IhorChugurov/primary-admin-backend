import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { FacilitiesService } from "./facilities.service";
import { CreateFacilityDto } from "./dto/create-facility.dto";
import { UpdateFacilityDto } from "./dto/update-facility.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityRelationsDto } from "./dto/facility-relations.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { EntityTypeController } from "src/common/decorators/entity-type-controller.decorator";
import { EntityType } from "src/common/enums/entity-type.enum";
import { GroupId } from "src/common/decorators/group-id-query.decorator";
import { UUIDParam } from "src/common/decorators/uuid-param.decorator";

@Roles("SuperAdmin", "Admin")
@EntityTypeController(EntityType.FACILITY)
@Controller("facilities")
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @UseDto(FacilityRelationsDto)
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto): Promise<FacilityRelationsDto> {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
    @GroupId() groupId: string,
  ): Promise<PaginationDto<FacilityRelationsDto>> {
    return this.facilitiesService.findManyWithRelations(paginationOptionsDto, groupId);
  }

  @UseDto(FacilityRelationsDto)
  @Get(":id")
  findOne(@UUIDParam() facilityId: string): Promise<FacilityRelationsDto> {
    return this.facilitiesService.findOne(facilityId);
  }

  @UseDto(FacilityRelationsDto)
  @Patch(":id")
  update(
    @UUIDParam() facilityId: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ): Promise<FacilityRelationsDto> {
    return this.facilitiesService.update(facilityId, updateFacilityDto);
  }

  @Delete(":id")
  remove(@UUIDParam() facilityId: string): Promise<ResponseMessage> {
    return this.facilitiesService.remove(facilityId);
  }
}
