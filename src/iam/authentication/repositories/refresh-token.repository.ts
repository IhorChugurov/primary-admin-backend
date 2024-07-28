import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  createByIdAndSave(id: string, user: User): Promise<RefreshToken> {
    const refreshToken = this.create({
      id,
      user,
    });
    return this.save(refreshToken);
  }

  findAll(): Promise<RefreshToken[]> {
    return this.find();
  }

  findOneByIdAndUser(id: string, user: User): Promise<RefreshToken> {
    return this.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }
}
