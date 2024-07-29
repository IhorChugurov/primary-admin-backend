import { Expose, Type } from "class-transformer";
import { GroupDto } from "src/groups/dto/group.dto";

export class FacilityRelationDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  @Type(() => GroupDto)
  readonly group: GroupDto;
}
