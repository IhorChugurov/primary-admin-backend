import { ChildEntity, Column } from "typeorm";
import { EnvironmentValue } from "./environment-value.entity";

@ChildEntity()
export class EnvironmentStringValue extends EnvironmentValue {
  @Column()
  value: string;
}
