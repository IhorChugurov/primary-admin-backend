import { PartialType } from "@nestjs/mapped-types";
import { CreateEntityDefinitionDto } from "./create-entity-definition.dto";

export class UpdateEntityDefinitionDto extends PartialType(CreateEntityDefinitionDto) {}
