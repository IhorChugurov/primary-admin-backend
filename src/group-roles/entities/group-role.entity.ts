import { AbstractEntity } from "src/common/entities/abstract.entity";
import { GroupUser } from "src/group-users/entities/group-user.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(["name", "project"])
export class GroupRole extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.groupRoles, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.groupRole)
  groupUsers: GroupUser[];
}
