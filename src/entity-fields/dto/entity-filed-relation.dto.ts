import { Expose, Type } from "class-transformer";
import { EntityDefinitionDto } from "src/enitity-definitions/dto/entity-definition.dto";

export class EntityFieldRelationsDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly required: boolean;

  @Expose()
  readonly requiredText: string;

  @Expose()
  @Type(() => EntityDefinitionDto)
  readonly entityDefinition: EntityDefinitionDto;

  @Expose()
  @Type(() => EntityDefinitionDto)
  readonly selectorSource: EntityDefinitionDto;

  @Expose()
  readonly label: string;

  @Expose()
  readonly placeholder: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly forCreatePage: boolean;

  @Expose()
  readonly forEditPage: boolean;

  @Expose()
  readonly forEditPageDisabled: boolean;
}
