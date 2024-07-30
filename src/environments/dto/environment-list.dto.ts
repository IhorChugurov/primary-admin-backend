import { Expose } from "class-transformer";

export class EnvironmentListDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly key: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly valueType: string;

  @Expose()
  readonly destination: string;
}
