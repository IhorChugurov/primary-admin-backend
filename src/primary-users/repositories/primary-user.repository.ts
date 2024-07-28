import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PrimaryUser } from "../entities/primary-user.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { UpdateDefaultPrimaryUserDto } from "../dto/update-default-primary-user.dto";
import { CreateDefaultPrimaryUserDto } from "../dto/create-default-primary-user.dto";

@Injectable()
export class PrimaryUserRepository extends Repository<PrimaryUser> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(PrimaryUser, dataSource.createEntityManager());
  }

  async createAndSave(
    createDefaultPrimaryUserDto: CreateDefaultPrimaryUserDto,
  ): Promise<PrimaryUser> {
    const newPrimaryUser = this.create({
      user: createDefaultPrimaryUserDto.user,
      primaryRole: createDefaultPrimaryUserDto.primaryRole,
    });
    try {
      await this.save(newPrimaryUser);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.PRIMARY_USER);
    }
    return this.findOneByIdWithRelations(newPrimaryUser.id, ["user", "primaryRole"]);
  }

  async updateByIdWithRelations(
    id: string,
    primaryRole: PrimaryRole,
    relations: string[] = [],
  ): Promise<PrimaryUser> {
    await this.update(id, { primaryRole });
    return this.findOneByIdWithRelations(id, relations);
  }

  removeByEntity(primaryUser: PrimaryUser): Promise<PrimaryUser> {
    return this.remove(primaryUser);
  }

  async findManyWithPaginationAndRelations(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<{ entities: PrimaryUser[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("primaryUser");

    queryBuilder
      .leftJoinAndSelect("primaryUser.user", "user")
      .leftJoinAndSelect("primaryUser.primaryRole", "primaryRole")
      .orderBy("primaryUser.createdAt", paginationOptionsDto.order)
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

  findOneByID(id: string): Promise<PrimaryUser> {
    return this.findOne({
      where: { id },
    });
  }

  findOneByIdWithRelations(id: string, relations: string[] = []): Promise<PrimaryUser> {
    return this.findOne({
      where: { id },
      relations,
    });
  }

  findOneByUser(user: User): Promise<PrimaryUser> {
    return this.findOne({
      where: { user: { id: user.id } },
    });
  }

  findOneByUserIdWithRelations(userId: string, relations: string[] = []): Promise<PrimaryUser> {
    return this.findOne({
      where: { user: { id: userId } },
      relations,
    });
  }

  findOneByPrimaryRoleId(primaryRoleId: string, relations: string[] = []): Promise<PrimaryUser> {
    return this.findOne({
      where: { primaryRole: { id: primaryRoleId } },
      relations,
    });
  }

  async updatePrimaryRoleById(
    id: string,
    updateDefaultPrimaryUserDto: UpdateDefaultPrimaryUserDto,
  ): Promise<void> {
    await this.update(id, {
      primaryRole: updateDefaultPrimaryUserDto.primaryRole,
    });
  }
}
