import { AbstractEntity } from "src/common/entities/abstract.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
import { Group } from "src/groups/entities/group.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["user", "group", "project"])
export class GroupUser extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.groupUsers, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Group, (group) => group.groupUsers, { nullable: false })
  @JoinColumn({ name: "groupId" })
  group: Group;

  @ManyToOne(() => GroupRole, (groupRole) => groupRole.groupUsers, { nullable: false })
  @JoinColumn({ name: "groupRoleId" })
  groupRole: GroupRole;

  @ManyToOne(() => Project, (project) => project.groupUsers, { nullable: false })
  @JoinColumn({ name: "projectId" })
  project: Project;
}
