import { IsEmail, IsUUID, Length, Matches } from "class-validator";

export class CreatePrimaryUserDto {
  @IsEmail()
  readonly email: string;

  @Length(12, 50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,50}$/, {
    message:
      "Password must be between 12 and 50 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  })
  readonly password: string;

  @IsUUID()
  readonly primaryRoleId: string;
}
