import { IsUUID } from "class-validator";

export class GroupUserQueryDto {
  @IsUUID()
  groupId: string;
}
