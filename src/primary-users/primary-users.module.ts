import { Module } from "@nestjs/common";
import { PrimaryUsersService } from "./primary-users.service";
import { PrimaryUsersController } from "./primary-users.controller";
import { PrimaryUser } from "./entities/primary-user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { PrimaryRolesModule } from "src/primary-roles/primary-roles.module";
import { APP_GUARD } from "@nestjs/core";
import { PrimaryRolesGuard } from "./authorization/guards/primary-roles.guard";
import { PrimaryUserRepository } from "./repositories/primary-user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PrimaryUser]), UsersModule, PrimaryRolesModule],
  controllers: [PrimaryUsersController],
  // TODO глобально ли используется этот гвард и если да, то как и почему
  providers: [
    PrimaryUsersService,
    {
      provide: APP_GUARD,
      useClass: PrimaryRolesGuard,
    },
    PrimaryUserRepository,
  ],
  exports: [PrimaryUsersService],
})
export class PrimaryUsersModule {}
