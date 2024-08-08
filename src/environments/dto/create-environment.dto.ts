import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EnvironmentValueType } from "../enums/environment-value-type.enum";
import { EnvironmentDestinations } from "../enums/evironment-destination.enum";

export class CreateEnvironmentDto {
  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @IsEnum(EnvironmentValueType)
  @IsNotEmpty()
  readonly valueType: EnvironmentValueType;

  @IsEnum(EnvironmentDestinations)
  @IsNotEmpty()
  readonly destination: EnvironmentDestinations;

  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @IsString()
  @IsOptional()
  readonly placeholder?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
