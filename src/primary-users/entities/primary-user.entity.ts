import { AbstractEntity } from "src/common/entities/abstract.entity";
import { PrimaryRole } from "src/primary-roles/entities/primary-role.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class PrimaryUser extends AbstractEntity {
  @OneToOne(() => User, (user) => user.primaryUser)
  @JoinColumn()
  user: User;

  @ManyToOne(() => PrimaryRole, (primaryRole) => primaryRole.primaryUsers)
  primaryRole: PrimaryRole;
}
