import { IsEmail, Length, Matches } from "class-validator";

export class SignUpDto {
  @IsEmail()
  readonly email: string;

  @Length(12, 50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,50}$/, {
    message:
      "Password must be between 12 and 50 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  })
  readonly password: string;
}
