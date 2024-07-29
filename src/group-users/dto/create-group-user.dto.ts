import { IsEmail, IsUUID } from "class-validator";

export class CreateGroupUserDto {
  @IsEmail()
  readonly email: string;

  @IsUUID()
  readonly groupId: string;
}
