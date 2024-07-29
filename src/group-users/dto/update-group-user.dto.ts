import { PickType } from "@nestjs/mapped-types";
import { CreateGroupUserDto } from "./create-group-user.dto";

export class UpdateGroupUserDto extends PickType(CreateGroupUserDto, ["groupRoleId"] as const) {}
