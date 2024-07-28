import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly email: string;
}
