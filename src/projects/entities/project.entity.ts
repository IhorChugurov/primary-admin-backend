import { AbstractEntity } from "src/common/entities/abstract.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
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
}
