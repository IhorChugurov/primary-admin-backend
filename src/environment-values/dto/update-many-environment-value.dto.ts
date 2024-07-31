import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { EnvironmentValueItemDto } from "./environment-value-item.dto";

export class UpdateManyEnvironmentValuesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnvironmentValueItemDto)
  items: EnvironmentValueItemDto[];
}
