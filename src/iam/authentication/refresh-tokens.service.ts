import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { RefreshTokenRepository } from "./repositories/refresh-token.repository";

// TODO InvalidatedRefreshTokenError
export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenService {
  constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}

  async insert(refreshTokenId: string, user: User): Promise<void> {
    await this.refreshTokenRepository.createByIdAndSave(refreshTokenId, user);
  }

  async validate(refreshTokenId: string, user: User): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findOneByIdAndUser(refreshTokenId, user);
    if (!refreshToken) {
      throw new InvalidatedRefreshTokenError();
    }
    return true;
  }

  async invalidate(id: string): Promise<void> {
    await this.refreshTokenRepository.deleteById(id);
  }
}
