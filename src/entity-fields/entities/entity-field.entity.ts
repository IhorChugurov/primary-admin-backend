import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { EntityFieldType } from "../enums/entity-field-type.enum";
import { EntityDefinition } from "src/enitity-definitions/entities/entity-definition.entity";

@Entity()
@Unique(["name", "entityDefinition"])
export class EntityField extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ type: "enum", enum: EntityFieldType, nullable: false })
  type: EntityFieldType;

  @Column({ default: true, nullable: false })
  required: boolean;

  @Column({ nullable: true })
  requiredText: string;

  @ManyToOne(() => EntityDefinition, (entityDefinition) => entityDefinition.entityFields, {
    nullable: false,
  })
  @JoinColumn({ name: "entityDefinitionId" })
  entityDefinition: EntityDefinition;

  @ManyToOne(() => EntityDefinition, (entityDefinition) => entityDefinition.selectorSources, {
    nullable: true,
  })
  @JoinColumn({ name: "selectorSourceId" })
  selectorSource: EntityDefinition;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true, nullable: false })
  createPage: boolean;

  @Column({ default: true, nullable: false })
  editPage: boolean;

  @Column({ default: false, nullable: false })
  editPageDisabled: boolean;
}
