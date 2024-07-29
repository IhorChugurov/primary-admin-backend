import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PasswordService } from "src/shared/password.service";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async findOrCreate(email: string): Promise<User> {
    let user = await this.userRepository.findOneByEmail(email);

    if (user) {
      return user;
    }
    const password = this.passwordService.generatePassword();

    this.logger.log(`Generated password for ${email}: ${password}`);

    return this.userRepository.createAndSave({ email, password });
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
