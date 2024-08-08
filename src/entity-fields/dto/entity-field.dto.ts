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
  readonly createPage: boolean;

  @Expose()
  readonly editPage: boolean;

  @Expose()
  readonly editPageDisabled: boolean;
}
