import { ChildEntity, Column } from "typeorm";
import { EnvironmentValue } from "./environment-value.entity";

@ChildEntity()
export class EnvironmentDateValue extends EnvironmentValue {
  @Column()
  value: Date;
}
