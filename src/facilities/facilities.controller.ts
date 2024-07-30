import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus,
} from "@nestjs/common";
import { FacilitiesService } from "./facilities.service";
import { CreateFacilityDto } from "./dto/create-facility.dto";
import { UpdateFacilityDto } from "./dto/update-facility.dto";
import { Roles } from "src/primary-users/authorization/decorators/primary-roles.decorator";
import { UseDto } from "src/common/decorators/dto.decorator";
import { FacilityRelationsDto } from "./dto/facility-relations.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Roles("SuperAdmin", "Admin")
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
    //TODO improve the validation
    @Query("groupId", new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
    groupId: string,
  ): Promise<PaginationDto<FacilityRelationsDto>> {
    return this.facilitiesService.findManyWithRelations(paginationOptionsDto, groupId);
  }

  @UseDto(FacilityRelationsDto)
  @Get(":id")
  findOne(@Param("id") facilityId: string): Promise<FacilityRelationsDto> {
    return this.facilitiesService.findOne(facilityId);
  }

  @UseDto(FacilityRelationsDto)
  @Patch(":id")
  update(
    @Param("id") facilityId: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ): Promise<FacilityRelationsDto> {
    return this.facilitiesService.update(facilityId, updateFacilityDto);
  }

  @Delete(":id")
  remove(@Param("id") facilityId: string): Promise<ResponseMessage> {
    return this.facilitiesService.remove(facilityId);
  }
}
