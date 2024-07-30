import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { EnvironmentValueType } from "../enums/environment-value-type.enum";
import { EnvironmentDestinations } from "../enums/evironment-destination.enum";

export class CreateEnvironmentDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsEnum(EnvironmentValueType)
  @IsNotEmpty()
  valueType: EnvironmentValueType;

  @IsEnum(EnvironmentDestinations)
  @IsNotEmpty()
  destination: EnvironmentDestinations;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  placeholder?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
