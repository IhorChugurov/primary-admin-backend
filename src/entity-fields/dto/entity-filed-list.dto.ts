import { Expose } from "class-transformer";

export class EntityFieldListDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly label: string;
}
