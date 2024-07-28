import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { HashingService } from "src/shared/hashing/hashing.service";
import { handleDatabaseErrors } from "src/database/utils/database-errors.utils";
import { EntityKeys } from "src/database/constants/database-error-mappings.constant";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectDataSource() dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createAndSave(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.password = await this.hashingService.hash(createUserDto.password);
    try {
      return await this.save(newUser);
    } catch (err) {
      handleDatabaseErrors(err, EntityKeys.USER);
    }
  }

  findOneByID(id: string): Promise<User> {
    return this.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email },
    });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const password = await this.hashingService.hash(updateUserDto.password);
    await this.update(id, {
      password,
    });
    return this.findOneByID(id);
  }
}
