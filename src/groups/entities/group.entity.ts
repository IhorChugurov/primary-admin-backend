import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Group extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Facility, (facility) => facility.group)
  companies: Facility[];
}
