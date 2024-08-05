import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["environment", "facility", "project"])
export abstract class EnvironmentValue extends AbstractEntity {
  @Column("jsonb", { nullable: false })
  value: any;

  @ManyToOne(() => Environment, (environment) => environment.environmentValues, { nullable: false })
  @JoinColumn({ name: "environmentId" })
  environment: Environment;

  @ManyToOne(() => Project, (project) => project.environmentValues)
  @JoinColumn({ name: "projectId" })
  project: Project;

  @ManyToOne(() => Facility, (facility) => facility.environmentValues, { nullable: true })
  @JoinColumn({ name: "facilityId" })
  facility?: Facility;
}
