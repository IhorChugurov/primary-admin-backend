import { IsEmail, IsUUID, Length, Matches } from "class-validator";

export class CreatePrimaryUserDto {
  @IsEmail()
  readonly email: string;

  @IsUUID()
  readonly primaryRoleId: string;
}
