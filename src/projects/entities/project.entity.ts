import { AbstractEntity } from "src/common/entities/abstract.entity";
import { EntityDefinition } from "src/enitity-definitions/entities/entity-definition.entity";
import { EnvironmentValue } from "src/environment-values/entities/environment-value.entity";
import { Environment } from "src/environments/entities/environment.entity";
import { FacilityRole } from "src/facility-roles/entities/facility-role.entity";
import { FacilityUser } from "src/facility-users/entities/facility-user.entity";
import { GroupRole } from "src/group-roles/entities/group-role.entity";
import { GroupUser } from "src/group-users/entities/group-user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Project extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => GroupRole, (groupRole) => groupRole.project)
  groupRoles: GroupRole[];

  @OneToMany(() => FacilityRole, (facilityRole) => facilityRole.project)
  facilityRoles: FacilityRole[];

  @OneToMany(() => GroupUser, (groupUser) => groupUser.project)
  groupUsers: GroupUser[];

  @OneToMany(() => FacilityUser, (facilityUser) => facilityUser.project)
  facilityUsers: FacilityUser[];

  @OneToMany(() => Environment, (environment) => environment.project)
  environments: Environment[];

  @OneToMany(() => EnvironmentValue, (environmentValue) => environmentValue.project)
  environmentValues: EnvironmentValue[];

  @OneToMany(() => EntityDefinition, (entityDefinition) => entityDefinition.project)
  entityDefinitions: EntityDefinition[];
}
