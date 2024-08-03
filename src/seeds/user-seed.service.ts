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
    this.logger.log("Starting user seeding process");
    const userEmail = process.env.USER_EMAIL;
    const userPassword = process.env.USER_PASSWORD;

    this.logger.log(`Attempting to find user with email: ${userEmail}`);
    let existingUser: User | null;
    try {
      existingUser = await this.usersService.findOneByEmail(userEmail);
      this.logger.log(`User search result: ${existingUser ? "Found" : "Not found"}`);
      this.logger.log(`${existingUser}`);
    } catch (error: any) {
      this.logger.error(`Error finding user: ${error.message}`, error.stack);
      throw error;
    }

    if (!existingUser) {
      // Creating a new user
      this.logger.log("Creating new user");
      const newUser = await this.usersService.createDefaultUser({
        email: userEmail,
        password: userPassword,
      });
      this.logger.log(`User #${userEmail} has been created.`);
      return newUser;
    } else {
      this.logger.log("Checking password for existing user");
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
