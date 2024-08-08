import { Expose } from "class-transformer";

export class EntityDefinitionDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly tableName: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly type: string;
}
