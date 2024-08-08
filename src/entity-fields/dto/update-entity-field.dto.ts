import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateEntityFieldDto } from "./create-entity-field.dto";

export class UpdateEntityFieldDto extends PartialType(
  OmitType(CreateEntityFieldDto, ["entityDefinitionId"] as const),
) {}
