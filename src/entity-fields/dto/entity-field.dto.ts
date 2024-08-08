import { Expose } from "class-transformer";

export class EntityFieldDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly required: boolean;

  @Expose()
  readonly requiredText: string;

  @Expose()
  readonly label: string;

  @Expose()
  readonly placeholder: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly forCreatePage: boolean;

  @Expose()
  readonly forEditPage: boolean;

  @Expose()
  readonly forEditPageDisabled: boolean;
}
