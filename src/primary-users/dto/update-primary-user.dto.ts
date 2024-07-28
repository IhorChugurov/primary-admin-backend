import { PickType } from "@nestjs/mapped-types";
import { CreatePrimaryUserDto } from "./create-primary-user.dto";

export class UpdatePrimaryUserDto extends PickType(CreatePrimaryUserDto, [
  "primaryRoleId",
] as const) {}
