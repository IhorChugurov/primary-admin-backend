import { AbstractEntity } from "src/common/entities/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class RefreshToken extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.refreshTokens, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: User;
}
