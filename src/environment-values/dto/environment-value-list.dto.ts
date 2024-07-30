import { Expose } from "class-transformer";

export class EnvironmentValueListDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly key: string;

  @Expose()
  readonly valueType: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly placeholder: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly value: any;
}
