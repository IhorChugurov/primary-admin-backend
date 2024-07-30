import { ChildEntity, Column } from "typeorm";
import { EnvironmentValue } from "./environment-value.entity";

@ChildEntity()
export class EnvironmentBooleanValue extends EnvironmentValue {
  @Column()
  value: boolean;
}
