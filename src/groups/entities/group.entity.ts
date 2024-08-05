import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { GroupUser } from "src/group-users/entities/group-user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Group extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Facility, (facility) => facility.group)
  facilities: Facility[];

  @OneToMany(() => GroupUser, (groupUser) => groupUser.group)
  groupUsers: GroupUser[];
}
