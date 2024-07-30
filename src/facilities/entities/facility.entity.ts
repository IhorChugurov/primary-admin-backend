import { AbstractEntity } from "src/common/entities/abstract.entity";
import { EnvironmentValue } from "src/environment-values/entities/environment-value.entity";
import { FacilityUser } from "src/facility-users/entities/facility-user.entity";
import { Group } from "src/groups/entities/group.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Facility extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Group, (group) => group.facilities)
  group: Group;

  @OneToMany(() => FacilityUser, (facilityUser) => facilityUser.facility)
  facilityUsers: FacilityUser[];

  @OneToMany(() => EnvironmentValue, (environmentValue) => environmentValue.facility)
  environmentValues: EnvironmentValue[];
}
