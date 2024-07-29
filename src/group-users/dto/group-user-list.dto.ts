import { Expose, Transform } from "class-transformer";

export class GroupUserListDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Transform(({ obj }) => obj.groupRole.name)
  readonly role: string;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  readonly email: string;

  @Expose()
  readonly createdAt: string;
}
