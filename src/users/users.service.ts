import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOrCreate(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOneByEmail(createUserDto.email);

    if (user) {
      return user;
    }

    return this.userRepository.createAndSave(createUserDto);
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneByID(userId);
    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }
    return user;
  }

  // For seeding
  async createDefaultUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createAndSave(createUserDto);
  }

  // For seeding
  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }

  // For seeding
  async updateDefaultUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateById(userId, updateUserDto);
  }
}
