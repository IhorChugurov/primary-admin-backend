import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { EnvironmentValueType } from "../enums/environment-value-type.enum";
import { EnvironmentDestinations } from "../enums/evironment-destination.enum";
import { Project } from "src/projects/entities/project.entity";
import { EnvironmentValue } from "src/environment-values/entities/environment-value.entity";

@Entity()
@Unique(["key", "project"])
export class Environment extends AbstractEntity {
  @Column({ nullable: false })
  key: string;

  @Column({ type: "enum", enum: EnvironmentValueType, nullable: false })
  valueType: EnvironmentValueType;

  @Column({ type: "enum", enum: EnvironmentDestinations, nullable: false })
  destination: EnvironmentDestinations;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.environments, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @OneToMany(() => EnvironmentValue, (environmentValue) => environmentValue.environment)
  environmentValues: EnvironmentValue[];
}
