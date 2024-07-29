import { AbstractEntity } from "src/common/entities/abstract.entity";
import { GroupUser } from "src/group-users/entities/group-user.entity";
import { RefreshToken } from "src/iam/authentication/entities/refresh-token.entity";
import { PrimaryUser } from "src/primary-users/entities/primary-user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  transformFields() {
    if (this.email) {
      this.email = this.email.trim().toLowerCase();
    }
  }

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => PrimaryUser, (primaryUser) => primaryUser.user)
  primaryUser: PrimaryUser;

  @OneToMany(() => GroupUser, (groupUser) => groupUser.user)
  groupUsers: GroupUser[];
}
