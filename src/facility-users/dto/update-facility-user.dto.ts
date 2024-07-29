import { PickType } from "@nestjs/mapped-types";
import { CreateFacilityUserDto } from "./create-facility-user.dto";

export class UpdateFacilityUserDto extends PickType(CreateFacilityUserDto, [
  "facilityRoleId",
] as const) {}
