import { Injectable, NotFoundException } from "@nestjs/common";
import { PrimaryRoleRepository } from "./repositories/primary-role.repository";
import { PrimaryRole } from "./entities/primary-role.entity";
import { CreatePrimaryRoleDto } from "./dto/create-primary-role.dto";
import { UpdatePrimaryRoleDto } from "./dto/update-primery-role.rto";

@Injectable()
export class PrimaryRolesService {
  constructor(private readonly primaryRoleRepository: PrimaryRoleRepository) {}

  // Also using for seeding
  findAll(): Promise<PrimaryRole[]> {
    return this.primaryRoleRepository.findAll();
  }

  async findOne(primaryRoleId: string): Promise<PrimaryRole> {
    const primaryRole = await this.primaryRoleRepository.findOneByID(primaryRoleId);
    if (!primaryRole) {
      throw new NotFoundException(`Role with ID #${primaryRoleId} not found`);
    }
    return primaryRole;
  }

  // For seeding
  async createDefaultPrimaryRole(createPrimaryRoleDto: CreatePrimaryRoleDto): Promise<PrimaryRole> {
    return this.primaryRoleRepository.createAndSave(createPrimaryRoleDto);
  }

  // For seeding
  findOneByName(name: string): Promise<PrimaryRole> {
    return this.primaryRoleRepository.findOneByName(name);
  }

  // For seeding
  async updateDefaultPrimaryRole(
    primaryRoleId: string,
    updatePrimaryRoleDto: UpdatePrimaryRoleDto,
  ): Promise<PrimaryRole> {
    return this.primaryRoleRepository.updateById(primaryRoleId, updatePrimaryRoleDto);
  }
}
