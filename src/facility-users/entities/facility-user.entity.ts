import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["user", "facility", "project"])
export class FacilityUser extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.groupUsers)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Facility, (facility) => facility.facilityUsers)
  facility: Facility;

  @ManyToOne(() => FacilityRole, (facilityRole) => facilityRole.facilityUsers)
  facilityRole: FacilityRole;

  @ManyToOne(() => Project, (project) => project.facilityUsers)
  project: Project;
}
