import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { EnvironmentValueType } from "../enums/environment-value-type.enum";
import { EnvironmentDestinations } from "../enums/evironment-destination.enum";
import { Project } from "src/projects/entities/project.entity";
import { EnvironmentValue } from "src/environment-values/entities/environment-value.entity";

@Entity()
@Unique(["key", "project"])
export class Environment extends AbstractEntity {
  @Column()
  key: string;

  @Column({ type: "enum", enum: EnvironmentValueType })
  valueType: EnvironmentValueType;

  @Column({ type: "enum", enum: EnvironmentDestinations })
  destination: EnvironmentDestinations;

  @Column()
  label: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.environments)
  project: Project;

  @OneToMany(() => EnvironmentValue, (environmentValue) => environmentValue.environment)
  environmentValues: EnvironmentValue[];
}
