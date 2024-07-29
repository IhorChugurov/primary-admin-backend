import { IsUUID } from "class-validator";

export class ProjectIdDto {
  @IsUUID()
  projectId: string;
}
