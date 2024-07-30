import { ChildEntity, Column } from "typeorm";
import { EnvironmentValue } from "./environment-value.entity";

@ChildEntity()
export class EnvironmentNumberValue extends EnvironmentValue {
  @Column()
  value: number;
}
