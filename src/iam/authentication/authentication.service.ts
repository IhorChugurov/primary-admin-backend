import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { InvalidatedRefreshTokenError, RefreshTokenService } from "./refresh-tokens.service";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokenData } from "./interfaces/refresh-token.interface";
import { HashingService } from "src/shared/hashing/hashing.service";
import { UserRepository } from "src/users/repositories/user.repository";
import { TokensDto } from "./dto/tokens.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userRepository.createAndSave(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<TokensDto> {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException("User does not exists");
    }
    const isEqual = await this.hashingService.compare(signInDto.password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException("Password does not match");
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<TokensDto> {
    const refreshTokenId = uuidv4();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
      }),
      this.signToken<Partial<RefreshTokenData>>(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenService.insert(refreshTokenId, user);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<TokensDto> {
    try {
      console.log(refreshTokenDto);
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<RefreshTokenData>(
        refreshTokenDto.refreshToken,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
        },
      );
      console.log(sub, refreshTokenId);
      const user = await this.userRepository.findOneByOrFail({
        id: sub,
      });
      console.log(user);
      const isValid = await this.refreshTokenService.validate(refreshTokenId, user);
      if (isValid) {
        await this.refreshTokenService.invalidate(refreshTokenId);
      } else {
        throw new Error("Refresh token invalid");
      }
      return this.generateTokens(user);
    } catch (err) {
      console.log(err);
      // Checking refresh token reuse.
      if (err instanceof InvalidatedRefreshTokenError) {
        // TODO Add additional actions when reusing a refresh token.
        throw new UnauthorizedException("Refresh token invalid");
      }
      throw new UnauthorizedException();
    }
  }

  private signToken<T>(userId: string, expiresIn: number, payload?: T): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
