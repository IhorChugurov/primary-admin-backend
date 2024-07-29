import { Expose } from "class-transformer";

export class TokensDto {
  @Expose()
  readonly accessToken: string;

  @Expose()
  readonly refreshToken: string;

  @Expose()
  readonly email: string;
}
