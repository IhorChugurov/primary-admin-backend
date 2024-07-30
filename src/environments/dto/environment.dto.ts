import { Expose } from "class-transformer";

export class EnvironmentDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly key: string;

  @Expose()
  readonly valueType: string;

  @Expose()
  readonly destination: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly placeholder: string;

  @Expose()
  readonly description: string;
}
