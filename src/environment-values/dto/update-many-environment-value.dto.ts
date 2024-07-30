import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateManyEnvironmentValuesDto {
  @IsString()
  @IsNotEmpty()
  facilityId: string;

  @IsArray()
  items: Array<Record<string, boolean | string | number | Date>>;
}
