import { AbstractEntity } from "src/common/entities/abstract.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
import { Group } from "src/groups/entities/group.entity";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(["user", "group", "project"])
export class GroupUser extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.groupUsers)
  user: User;

  @ManyToOne(() => Group, (group) => group.groupUsers)
  group: Group;

  @ManyToOne(() => GroupRole, (groupRole) => groupRole.groupUsers)
  groupRole: GroupRole;

  @ManyToOne(() => Project, (project) => project.groupUsers)
  project: Project;
}
