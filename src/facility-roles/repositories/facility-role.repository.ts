import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { FacilityRole } from "../entities/facility-role.entity";
import { CreateFacilityRoleDto } from "../dto/create-facility-role.dto";

@Injectable()
export class FacilityRoleRepository extends Repository<FacilityRole> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FacilityRole, dataSource.createEntityManager());
  }

  async createAndSave(createFacilityRoleDto: CreateFacilityRoleDto): Promise<FacilityRole> {
    const newFacilityRole = this.create({
      name: createFacilityRoleDto.name,
      description: createFacilityRoleDto.description,
      project: createFacilityRoleDto.project,
    });
    try {
      await this.save(newFacilityRole);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.FACILITY_ROLE);
    }
    return this.findOneByIdWithRelations(newFacilityRole.id, ["project"]);
  }

  findOneByIdWithRelations(id: string, relations: string[] = []): Promise<FacilityRole> {
    return this.findOne({
      where: { id },
      relations,
    });
  }

  findAllWithRelations(relations: string[] = []): Promise<FacilityRole[]> {
    return this.find({ relations });
  }
}
