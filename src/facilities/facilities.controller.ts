import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { FacilitiesService } from "./facilities.service";
import { CreateFacilityDto } from "./dto/create-facility.dto";
import { UpdateFacilityDto } from "./dto/update-facility.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityRelationDto } from "./dto/facility-relation.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Roles("SuperAdmin", "Admin")
@Controller("facilities")
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @UseDto(FacilityRelationDto)
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto): Promise<FacilityRelationDto> {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<FacilityRelationDto>> {
    return this.facilitiesService.findMany(paginationOptionsDto);
  }

  @UseDto(FacilityRelationDto)
  @Get(":id")
  findOne(@Param("id") facilityId: string): Promise<FacilityRelationDto> {
    return this.facilitiesService.findOne(facilityId);
  }

  @UseDto(FacilityRelationDto)
  @Patch(":id")
  update(
    @Param("id") facilityId: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ): Promise<FacilityRelationDto> {
    return this.facilitiesService.update(facilityId, updateFacilityDto);
  }

  @Delete(":id")
  remove(@Param("id") facilityId: string): Promise<ResponseMessage> {
    return this.facilitiesService.remove(facilityId);
  }
}
