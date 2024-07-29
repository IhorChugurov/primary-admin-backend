import { Expose, Type } from "class-transformer";
import { FacilityDto } from "src/facilities/dto/facility.dto";

export class GroupFacilitiesDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly updatedAt: Date;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  @Type(() => FacilityDto)
  readonly facilities: FacilityDto[];

  @Expose()
  readonly facilitiesQty: number;
}
