import { Expose } from "class-transformer";

export class GroupDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;
}
