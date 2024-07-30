import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { EnvironmentValue } from "../entities/environment-value.entity";

@Injectable()
export class EnvironmentValueRepository extends Repository<EnvironmentValue> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(EnvironmentValue, dataSource.createEntityManager());
  }

  findAllWithRelations(
    projectId: string,
    facilityId: string,
    relations: string[] = [],
  ): Promise<EnvironmentValue[]> {
    return this.find({
      where: { project: { id: projectId }, facility: { id: facilityId } },
      relations,
    });
  }
}
