import { AbstractEntity } from "src/common/entities/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne } from "typeorm";

@Entity()
export class RefreshToken extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: "CASCADE" })
  user: User;
}
