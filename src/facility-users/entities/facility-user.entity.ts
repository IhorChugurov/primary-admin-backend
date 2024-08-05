import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["user", "facility", "project"])
export class FacilityUser extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.groupUsers, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Facility, (facility) => facility.facilityUsers, { nullable: false })
  @JoinColumn({ name: "facilityId" })
  facility: Facility;

  @ManyToOne(() => FacilityRole, (facilityRole) => facilityRole.facilityUsers, { nullable: false })
  @JoinColumn({ name: "facilityRoleId" })
  facilityRole: FacilityRole;

  @ManyToOne(() => Project, (project) => project.facilityUsers, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;
}
