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

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupRepository.createAndSave(createGroupDto);
  }

  async findMany(paginationOptionsDto: PaginationOptionsDto): Promise<PaginationDto<GroupDto>> {
    const { entities, totalItems } =
      await this.groupRepository.findManyWithPagination(paginationOptionsDto);

    console.log(entities);

    const groupDtos = plainToInstance(GroupDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    console.log(groupDtos);

    return new PaginationDto(groupDtos, paginationMetaDto);
  }

  async findOne(groupId: string): Promise<Group> {
    const group = await this.groupRepository.findOneByID(groupId);
    if (!group) {
      throw new NotFoundException(`Group with ID #${groupId} not found`);
    }
    return group;
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
