import { Expose, Type } from "class-transformer";
import { PrimaryRoleDto } from "src/primary-roles/dto/primary-role.dto";
import { UserDto } from "src/users/dto/user.dto";

export class PrimaryUserDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Type(() => UserDto)
  readonly user: UserDto;

  @Expose()
  @Type(() => PrimaryRoleDto)
  readonly primaryRole: PrimaryRoleDto;
}
