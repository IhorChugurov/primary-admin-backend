import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["environment", "facility", "project"])
export abstract class EnvironmentValue extends AbstractEntity {
  @Column("jsonb")
  value: any;

  @ManyToOne(() => Environment, (environment) => environment.environmentValues)
  environment: Environment;

  @ManyToOne(() => Project, (project) => project.environmentValues)
  project: Project;

  @ManyToOne(() => Facility, (facility) => facility.environmentValues, { nullable: true })
  facility?: Facility;
}
