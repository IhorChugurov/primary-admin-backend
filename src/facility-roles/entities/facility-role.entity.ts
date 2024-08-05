import { AbstractEntity } from "src/common/entities/abstract.entity";
import { FacilityUser } from "src/facility-users/entities/facility-user.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(["name", "project"])
export class FacilityRole extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.facilityRoles, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @OneToMany(() => FacilityUser, (facilityUser) => facilityUser.facilityRole)
  facilityUsers: FacilityUser[];
}
