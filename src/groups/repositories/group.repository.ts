import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { Group } from "../entities/group.entity";
import { CreateGroupDto } from "../dto/create-group.dto";
import { UpdateGroupDto } from "../dto/update-group.dto";
import { PaginationOptionsDto } from "src/common/dto/pagination-options.dto";

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Group, dataSource.createEntityManager());
  }

  async createAndSave(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.create({
      name: createGroupDto.name,
      description: createGroupDto.description,
    });
    try {
      return await this.save(newGroup);
    } catch (err) {
      console.log(err);
      handleDatabaseErrors(err, EntityKeys.GROUP);
    }
  }

  async updateById(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    try {
      await this.update(id, {
        name: updateGroupDto.name,
        description: updateGroupDto.description,
      });
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.GROUP);
    }
    return this.findOneByID(id);
  }

  removeByEntity(group: Group): Promise<Group> {
    return this.remove(group);
  }

  async findManyWithPagination(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<{ entities: Group[]; totalItems: number }> {
    const queryBuilder = this.createQueryBuilder("group");

    queryBuilder
      .orderBy("group.createdAt", paginationOptionsDto.order)
      .skip(paginationOptionsDto.skip)
      .take(paginationOptionsDto.perPage);

    if (paginationOptionsDto.search) {
      const trimmedSearch = paginationOptionsDto.search.trim();
      queryBuilder.andWhere("group.name LIKE :search", {
        search: `%${trimmedSearch}%`,
      });
    }
    const [entities, totalItems] = await queryBuilder.getManyAndCount();
    return { entities, totalItems };
  }

  findOneByName(name: string): Promise<Group> {
    console.log(name);
    return this.findOne({
      where: { name },
    });
  }

  findOneByID(id: string): Promise<Group> {
    return this.findOne({
      where: { id },
    });
  }
}
