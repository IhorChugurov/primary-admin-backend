import { IsString } from "class-validator";
import { IsMultiType } from "../validators/multi-type.validator";

export class EnvironmentValueItemDto {
  @IsString()
  key: string;

  @IsMultiType({ message: "value must be a boolean, string, number, or Date" })
  value: boolean | string | number | Date;
}
