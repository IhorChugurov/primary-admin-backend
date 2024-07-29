import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFacilityDto } from "./dto/create-facility.dto";
import { UpdateFacilityDto } from "./dto/update-facility.dto";
import { FacilityRelationDto } from "./dto/facility-relation.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { FacilityRepository } from "./repositories/facility.repository";
import { GroupsService } from "src/groups/groups.service";
import { Facility } from "./entities/facility.entity";

@Injectable()
export class FacilitiesService {
  constructor(
    private readonly facilityRepository: FacilityRepository,
    private readonly groupsService: GroupsService,
  ) {}

  async create(createFacilityDto: CreateFacilityDto): Promise<Facility> {
    const group = await this.groupsService.findOne(createFacilityDto.groupId);
    return this.facilityRepository.createAndSave(createFacilityDto, group);
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<FacilityRelationDto>> {
    const { entities, totalItems } =
      await this.facilityRepository.findManyWithPaginationAndRelations(paginationOptionsDto);

    const facilityDtos = plainToInstance(FacilityRelationDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(facilityDtos, paginationMetaDto);
  }

  async findOne(facilityId: string): Promise<Facility> {
    const facility = await this.facilityRepository.findOneByID(facilityId);
    if (!facility) {
      throw new NotFoundException(`Facility with ID #${facilityId} not found`);
    }
    return facility;
  }

  async update(facilityId: string, updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
    const facility = await this.facilityRepository.findOneByID(facilityId);
    if (!facility) {
      throw new NotFoundException(`Facility with ID #${facility} not found`);
    }
    return this.facilityRepository.updateById(facilityId, updateFacilityDto);
  }

  async remove(facilityId: string): Promise<ResponseMessage> {
    const facility = await this.facilityRepository.findOneByID(facilityId);
    if (!facility) {
      throw new NotFoundException(`Facility with ID #${facilityId} not found`);
    }
    await this.facilityRepository.removeByEntity(facility);
    return {
      message: `Facility with ID #${facilityId} has been deleted successfully`,
    };
  }
}
