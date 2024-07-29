import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { FacilityUser } from "../entities/facility-user.entity";
import { Project } from "src/projects/entities/project.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";

@Injectable()
export class FacilityUserRepository extends Repository<FacilityUser> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FacilityUser, dataSource.createEntityManager());
  }

  async createAndSave(
    user: User,
    facility: Facility,
    facilityRole: FacilityRole,
    project: Project,
  ): Promise<FacilityUser> {
    const newFacilityUser = this.create({
      user,
      facility,
      facilityRole,
      project,
    });
    try {
      await this.save(newFacilityUser);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.FACILITY_USER);
    }
    return this.findOneByIdWithRelations(newFacilityUser.id, project.id, [
      "user",
      "facility",
      "facilityRole",
      "project",
    ]);
  }

  async updateByIdWithRelations(
    id: string,
    facilityRole: FacilityRole,
    projectId: string,
    relations: string[] = [],
  ): Promise<FacilityUser> {
    await this.update({ id, project: { id: projectId } }, { facilityRole });
    return this.findOneByIdWithRelations(id, projectId, relations);
  }

  async deleteById(facilityUserId: string, projectId: string): Promise<void> {
    await this.delete({ id: facilityUserId, project: { id: projectId } });
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
    projectId: string,
  ): Promise<{ entities: FacilityUser[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("facilityUser");

    queryBuilder
      .leftJoinAndSelect("facilityUser.user", "user")
      .leftJoinAndSelect("facilityUser.facility", "facility")
      .leftJoinAndSelect("facilityUser.facilityRole", "facilityRole")
      .leftJoinAndSelect("facilityUser.project", "project")
      .where("project.id = :projectId", { projectId })
      .orderBy("facilityUser.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("user.email LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByID(id: string, projectId: string): Promise<FacilityUser> {
    return this.findOne({
      where: { id, project: { id: projectId } },
    });
  }

  findOneByIdWithRelations(
    id: string,
    projectId: string,
    relations: string[] = [],
  ): Promise<FacilityUser> {
    return this.findOne({
      where: { id, project: { id: projectId } },
      relations,
    });
  }
}
