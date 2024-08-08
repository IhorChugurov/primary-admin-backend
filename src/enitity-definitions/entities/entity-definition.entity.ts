import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import { EntityDefinitionType } from "../enums/entity-definition-type.enum";
import { EntityField } from "src/entity-fields/entities/entity-field.entity";

@Entity()
@Unique(["tableName", "project"])
export class EntityDefinition extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  tableName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: EntityDefinitionType, nullable: false })
  type: EntityDefinitionType;

  @ManyToOne(() => Project, (project) => project.environments, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @OneToMany(() => EntityField, (entityField) => entityField.entityDefinition)
  entityFields: EntityField[];

  @OneToMany(() => EntityField, (entityField) => entityField.selectorSource)
  selectorSources: EntityField[];
}
