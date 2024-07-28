import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["name", "project"])
export class GroupRole extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.groupRoles)
  project: Project;
}
