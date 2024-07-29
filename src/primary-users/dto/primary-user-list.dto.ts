import { Expose, Transform } from "class-transformer";

export class PrimaryUserListDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Transform(({ obj }) => obj.primaryRole.name)
  readonly role: string;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  readonly email: string;

  @Expose()
  readonly createdAt: string;
}
