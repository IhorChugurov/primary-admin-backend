import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["name", "project"])
export class FacilityRole extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.facilityRoles)
  project: Project;
}
