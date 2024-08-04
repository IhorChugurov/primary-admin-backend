import { IsUUID } from "class-validator";

export class FacilityUserQueryDto {
  @IsUUID()
  facilityId: string;
}
