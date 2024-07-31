import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class EnvironmentValueItemDto {
  @IsString()
  key: string;

  @IsBoolean()
  @IsNumber()
  @IsString()
  @IsDate()
  value: boolean | string | number | Date;
}
