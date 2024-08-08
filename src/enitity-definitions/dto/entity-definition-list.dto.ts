import { Expose } from "class-transformer";

export class EntityDefinitionListDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly tableName: string;

  @Expose()
  readonly type: string;
}
