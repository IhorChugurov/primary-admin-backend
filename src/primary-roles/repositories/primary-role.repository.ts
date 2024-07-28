import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { CreatePrimaryRoleDto } from "../dto/create-primary-role.dto";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { UpdatePrimaryRoleDto } from "../dto/update-primery-role.rto";

@Injectable()
export class PrimaryRoleRepository extends Repository<PrimaryRole> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PrimaryRole, dataSource.createEntityManager());
  }

  async createAndSave(createPrimaryRoleDto: CreatePrimaryRoleDto): Promise<PrimaryRole> {
    const newPrimaryRole = this.create({
      name: createPrimaryRoleDto.name,
      description: createPrimaryRoleDto.description,
    });
    try {
      await this.save(newPrimaryRole);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.PRIMARY_ROLE);
    }
    return this.findOneByID(newPrimaryRole.id);
  }

  findAll(): Promise<PrimaryRole[]> {
    return this.find();
  }

  findOneByID(id: string): Promise<PrimaryRole> {
    return this.findOne({
      where: { id },
    });
  }

  findOneByName(name: string): Promise<PrimaryRole> {
    return this.findOne({
      where: { name },
    });
  }

  async updateById(id: string, updatePrimaryRoleDto: UpdatePrimaryRoleDto): Promise<PrimaryRole> {
    try {
      await this.update(id, {
        description: updatePrimaryRoleDto.description,
      });
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.PRIMARY_ROLE);
    }
    return this.findOneByID(id);
  }
}
