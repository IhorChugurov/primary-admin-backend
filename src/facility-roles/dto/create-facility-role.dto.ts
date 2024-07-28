import { Project } from "src/projects/entities/project.entity";

export class CreateFacilityRoleDto {
  readonly name: string;

  readonly description?: string;

  readonly project: Project;
}
