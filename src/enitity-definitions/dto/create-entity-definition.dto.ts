import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EntityDefinitionType } from "../enums/entity-definition-type.enum";

export class CreateEntityDefinitionDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly tableName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsEnum(EntityDefinitionType)
  @IsNotEmpty()
  readonly type: EntityDefinitionType;
}
