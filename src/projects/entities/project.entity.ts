import { AbstractEntity } from "src/common/entities/abstract.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";
import { FacilityUser } from "src/facility-users/entities/facility-user.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
import { GroupUser } from "src/group-users/entities/group-user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Project extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => GroupRole, (groupRole) => groupRole.project)
  groupRoles: GroupRole[];

  @OneToMany(() => FacilityRole, (facilityRole) => facilityRole.project)
  facilityRoles: FacilityRole[];

  @OneToMany(() => GroupUser, (groupUser) => groupUser.project)
  groupUsers: GroupUser[];

  @OneToMany(() => FacilityUser, (facilityUser) => facilityUser.project)
  facilityUsers: FacilityUser[];
}
