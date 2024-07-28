import { Injectable, Logger } from "@nestjs/common";
import { HashingService } from "src/shared/hashing/hashing.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class UsersSeedService {
  private readonly logger = new Logger(UsersSeedService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async seedUser(): Promise<User> {
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;

    const existingUser = await this.usersService.findOneByEmail(userEmail);

    if (!existingUser) {
      // Creating a new user
      const newUser = await this.usersService.createDefaultUser({
        email: userEmail,
        password: userPassword,
      });
      this.logger.log(`User #${userEmail} has been created.`);
      return newUser;
    } else {
      const passwordMatches = await this.hashingService.compare(
        userPassword,
        existingUser.password,
      );

      if (!passwordMatches) {
        // Updating password for an existing user
        const updatedUser = await this.usersService.updateDefaultUser(existingUser.id, {
          password: userPassword,
        });
        this.logger.log(`User #${userEmail} password has been updated.`);
        return updatedUser;
      } else {
        this.logger.log(`User #${userEmail} already exists and the password is up-to-date.`);
        return existingUser;
      }
    }
  }
}
