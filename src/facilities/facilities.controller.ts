import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { FacilitiesService } from "./facilities.service";
import { CreateFacilityDto } from "./dto/create-facility.dto";
import { UpdateFacilityDto } from "./dto/update-facility.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityDto } from "./dto/facility.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Roles("SuperAdmin", "Admin")
@Controller("facilities")
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @UseDto(FacilityDto)
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto): Promise<FacilityDto> {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  findMany(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<FacilityDto>> {
    return this.facilitiesService.findMany(paginationOptionsDto);
  }

  @UseDto(FacilityDto)
  @Get(":id")
  findOne(@Param("id") facilityId: string): Promise<FacilityDto> {
    return this.facilitiesService.findOne(facilityId);
  }

  @UseDto(FacilityDto)
  @Patch(":id")
  update(
    @Param("id") facilityId: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ): Promise<FacilityDto> {
    return this.facilitiesService.update(facilityId, updateFacilityDto);
  }

  @UseDto(FacilityDto)
  @Delete(":id")
  remove(@Param("id") facilityId: string): Promise<ResponseMessage> {
    return this.facilitiesService.remove(facilityId);
  }
}
