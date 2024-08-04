import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupRepository } from "./repositories/group.repository";
import { GroupDto } from "./dto/group.dto";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { Group } from "./entities/group.entity";
import { GroupFacilitiesDto } from "./dto/group-facilities.dto";

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepository: GroupRepository) {}

  create(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupRepository.createAndSave(createGroupDto);
  }

  async createWithRelations(createGroupDto: CreateGroupDto): Promise<GroupFacilitiesDto> {
    const group = await this.groupRepository.createAndSave(createGroupDto);
    return { ...group, facilities: [], facilitiesQty: 0 };
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<GroupFacilitiesDto>> {
    const { entities, totalItems } =
      await this.groupRepository.findManyWithPagination(paginationOptionsDto);

    const groupDtos = plainToInstance(GroupFacilitiesDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(groupDtos, paginationMetaDto);
  }

  async findManyWithFacilities(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<GroupFacilitiesDto>> {
    const { entities, totalItems } =
      await this.groupRepository.findManyWithPaginationAndRelations(paginationOptionsDto);

    const processedEntities = entities.map((group) => {
      const facilities = group.facilities.slice(0, 4);
      const facilitiesQty = group.facilities.length;

      return {
        ...group,
        facilities,
        facilitiesQty,
      };
    });

    const groupDtos = plainToInstance(GroupFacilitiesDto, processedEntities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(groupDtos, paginationMetaDto);
  }

  async findOne(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOneByID(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID #${groupId} not found`);
    }
    return group;
  }

  async findOneWithFacilities(groupId: string): Promise<GroupFacilitiesDto> {
    const group = await this.groupRepository.findOneByIdWithRelations(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID #${groupId} not found`);
    }

    const allFacilities = group.facilities || [];
    console.log(allFacilities);
    const facilities = allFacilities.slice(0, 4);
    const facilitiesQty = allFacilities.length;

    return {
      ...group,
      facilities: facilities,
      facilitiesQty: facilitiesQty,
    };
  }

  async update(groupId: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOneByID(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID #${group} not found`);
    }
    return this.groupRepository.updateById(groupId, updateGroupDto);
  }

  async remove(groupId: string): Promise<ResponseMessage> {
    // TODO нельзя удалить, пока создана хоть одна компания
    const group = await this.groupRepository.findOneByID(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID #${groupId} not found`);
    }
    await this.groupRepository.removeByEntity(group);
    return {
      message: `Group with ID #${groupId} has been deleted successfully`,
    };
  }
}
