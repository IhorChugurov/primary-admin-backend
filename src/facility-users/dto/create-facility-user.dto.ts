import { IsEmail, IsUUID } from "class-validator";

export class CreateFacilityUserDto {
  @IsEmail()
  readonly email: string;

  @IsUUID()
  readonly facilityId: string;

  @IsUUID()
  readonly facilityRoleId: string;
}
