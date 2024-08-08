import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { EntityFieldType } from "../enums/entity-field-type.enum";

export class CreateEntityFieldDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(EntityFieldType)
  @IsNotEmpty()
  readonly type: EntityFieldType;

  @IsBoolean()
  @IsNotEmpty()
  readonly required: boolean;

  @IsString()
  @IsOptional()
  readonly requiredText?: string;

  @IsUUID()
  @IsNotEmpty()
  readonly entityDefinitionId: string;

  @IsUUID()
  @IsOptional()
  readonly selectorSource?: string;

  @IsString()
  @IsNotEmpty()
  readonly label: string;

  @IsString()
  @IsOptional()
  readonly placeholder?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  readonly forCreatePage: boolean;

  @IsBoolean()
  readonly forEditPage: boolean;

  @IsBoolean()
  readonly forEditPageDisabled: boolean;
}
