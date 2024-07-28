import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
