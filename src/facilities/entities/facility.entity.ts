import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Facility extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Group, (group) => group.companies)
  group: Group;
}
