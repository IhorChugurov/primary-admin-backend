import { Project } from "src/projects/entities/project.entity";

export class CreateGroupRoleDto {
  readonly name: string;

  readonly description?: string;

  readonly project: Project;
}
