import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { User } from "src/users/entities/user.entity";

export class CreateDefaultPrimaryUserDto {
  readonly user: User;
  readonly primaryRole: PrimaryRole;
}
