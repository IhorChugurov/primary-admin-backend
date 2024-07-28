import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { AccessTokenGuard } from "./authentication/guards/access-token.guard";
import { RefreshTokenService } from "./authentication/refresh-tokens.service";
import { RefreshToken } from "./authentication/entities/refresh-token.entity";
import { SharedModule } from "src/shared/shared.module";
import { RefreshTokenRepository } from "./authentication/repositories/refresh-token.repository";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    SharedModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    RefreshTokenService,
    AuthenticationService,
    RefreshTokenRepository,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
