import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { Facility } from "../entities/facility.entity";
import { CreateFacilityDto } from "../dto/create-facility.dto";
import { UpdateFacilityDto } from "../dto/update-facility.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { Group } from "src/groups/entities/group.entity";

@Injectable()
export class FacilityRepository extends Repository<Facility> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Facility, dataSource.createEntityManager());
  }

  async createAndSave(createFacilityDto: CreateFacilityDto, group: Group): Promise<Facility> {
    const newFacility = this.create({
      name: createFacilityDto.name,
      description: createFacilityDto.description,
      group,
    });
    try {
      await this.save(newFacility);
    } catch (err) {
      console.log(err);
      handleDatabaseErrors(err, EntityKeys.FACILITY);
    }
    return this.findOneByIdWithRelations(newFacility.id, ["group"]);
  }

  async updateById(id: string, updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
    try {
      await this.update(id, {
        name: updateFacilityDto.name,
        description: updateFacilityDto.description,
      });
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.FACILITY);
    }
    return this.findOneByID(id);
  }

  removeByEntity(facility: Facility): Promise<Facility> {
    return this.remove(facility);
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<{ entities: Facility[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("facility");

    queryBuilder
      .leftJoinAndSelect("facility.group", "group")
      .orderBy("facility.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("facility.name LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByIdWithRelations(id: string, relations: string[] = []): Promise<Facility> {
    return this.findOne({
      where: { id },
      relations,
    });
  }

  findOneByName(name: string): Promise<Facility> {
    console.log(name);
    return this.findOne({
      where: { name },
    });
  }

  findOneByID(id: string): Promise<Facility> {
    return this.findOne({
      where: { id },
    });
  }
}
