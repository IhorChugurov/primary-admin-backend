import { IsEmail, Length } from "class-validator";

export class CreatePrimaryUserDto {
  @IsEmail()
  readonly email: string;
}
