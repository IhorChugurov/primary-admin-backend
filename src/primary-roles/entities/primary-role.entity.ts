import { AbstractEntity } from "src/common/entities/abstract.entity";
import { PrimaryUser } from "src/primary-users/entities/primary-user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class PrimaryRole extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => PrimaryUser, (primaryUser) => primaryUser.primaryRole)
  primaryUsers: PrimaryUser[];
}
