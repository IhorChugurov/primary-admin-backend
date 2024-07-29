import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePrimaryUserDto } from "./dto/create-primary-user.dto";
import { UsersService } from "src/users/users.service";
import { PrimaryRolesService } from "src/primary-roles/primary-roles.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationMetaDto } from "src/common/dto/pagination-meta.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { plainToInstance } from "class-transformer";
import { PrimaryUserRepository } from "./repositories/primary-user.repository";
import { PrimaryUser } from "./entities/primary-user.entity";
import { ResponseMessage } from "src/common/interfaces/response-message.interface";
import { UpdateDefaultPrimaryUserDto } from "./dto/update-default-primary-user.dto";
import { CreateDefaultPrimaryUserDto } from "./dto/create-default-primary-user.dto";
import { PrimaryUserListDto } from "./dto/primary-user-list.dto";
import { predefinedRoles } from "src/primary-roles/constants/primary-roles.constant";

@Injectable()
export class PrimaryUsersService {
  constructor(
    private readonly primaryUserRepository: PrimaryUserRepository,
    private readonly usersService: UsersService,
    private readonly primaryRolesService: PrimaryRolesService,
  ) {}

  async create(createPrimaryUserDto: CreatePrimaryUserDto): Promise<PrimaryUser> {
    // TODO can't create SuperAdmin
    const user = await this.usersService.findOrCreate(createPrimaryUserDto.email);
    const adminPrimaryRole = predefinedRoles.find((primaryRole) => primaryRole.name === "Admin");
    const primaryRole = await this.primaryRolesService.findOneByName(adminPrimaryRole.name);
    return this.primaryUserRepository.createAndSave({ user, primaryRole });
  }

  async findMany(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<PrimaryUserListDto>> {
    const { entities, totalItems } =
      await this.primaryUserRepository.findManyWithPaginationAndRelations(paginationOptionsDto);

    const primaryUserDtos = plainToInstance(PrimaryUserListDto, entities, {
      excludeExtraneousValues: true,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      totalItems,
    });

    return new PaginationDto(primaryUserDtos, paginationMetaDto);
  }

  async findOne(primaryUserId: string): Promise<PrimaryUser> {
    const primaryUser = await this.primaryUserRepository.findOneByIdWithRelations(primaryUserId, [
      "user",
      "primaryRole",
    ]);
    if (!primaryUser) {
      throw new NotFoundException(`User with ID #${primaryUserId} not found`);
    }
    return primaryUser;
  }

  async findOneByUserIdWithRelations(
    userId: string,
    relations: string[] = [],
  ): Promise<PrimaryUser> {
    const primaryUser = await this.primaryUserRepository.findOneByUserIdWithRelations(
      userId,
      relations,
    );
    if (!primaryUser) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }
    return primaryUser;
  }

  async remove(primaryUserId: string): Promise<ResponseMessage> {
    // TODO Can't delete super admin
    const primaryUser = await this.primaryUserRepository.findOneByID(primaryUserId);
    if (!primaryUser) {
      throw new NotFoundException(`User with ID #${primaryUserId} not found`);
    }
    await this.primaryUserRepository.removeByEntity(primaryUser);
    return {
      message: `Admin user with ID #${primaryUserId} has been deleted successfully`,
    };
  }

  // For seeding
  async createDefaultPrimaryUser(
    createDefaultPrimaryUserDto: CreateDefaultPrimaryUserDto,
  ): Promise<PrimaryUser> {
    return this.primaryUserRepository.createAndSave(createDefaultPrimaryUserDto);
  }

  // For seeding
  async findOneByPrimaryRoleIdWithRelationsSeed(
    primaryRoleId: string,
    relations: string[] = [],
  ): Promise<PrimaryUser> {
    return this.primaryUserRepository.findOneByPrimaryRoleId(primaryRoleId, relations);
  }

  // For seeding
  async findOneByUserIdWithRelationsSeed(
    userId: string,
    relations: string[] = [],
  ): Promise<PrimaryUser> {
    return this.primaryUserRepository.findOneByUserIdWithRelations(userId, relations);
  }

  // For seeding
  async updatePrimaryRoleById(
    primaryUserId: string,
    updateDefaultPrimaryUserDto: UpdateDefaultPrimaryUserDto,
  ): Promise<void> {
    return this.primaryUserRepository.updatePrimaryRoleById(
      primaryUserId,
      updateDefaultPrimaryUserDto,
    );
  }
}
