import { AbstractEntity } from "src/common/entities/abstract.entity";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class PrimaryUser extends AbstractEntity {
  @OneToOne(() => User, (user) => user.primaryUser, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => PrimaryRole, (primaryRole) => primaryRole.primaryUsers, { nullable: false })
  @JoinColumn({ name: "primaryRoleId" })
  primaryRole: PrimaryRole;
}
