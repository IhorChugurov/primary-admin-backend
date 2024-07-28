import { PickType } from "@nestjs/mapped-types";
import { CreatePrimaryRoleDto } from "./create-primary-role.dto";

export class UpdatePrimaryRoleDto extends PickType(CreatePrimaryRoleDto, [
  "description",
] as const) {}
