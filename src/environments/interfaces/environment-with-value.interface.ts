import { Environment } from "src/environments/entities/environment.entity";

export interface EnvironmentWithValues extends Environment {
  value: any;
}
