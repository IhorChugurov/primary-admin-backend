import { Expose, Transform } from "class-transformer";

export class FacilityUserListDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Transform(({ obj }) => obj.facilityRole.name)
  readonly role: string;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  readonly email: string;

  @Expose()
  readonly createdAt: string;
}
