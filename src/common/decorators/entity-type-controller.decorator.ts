import { SetMetadata } from "@nestjs/common";
import { EntityType } from "../enums/entity-type.enum";

export const EntityTypeController = (entityType: EntityType) =>
  SetMetadata("entityType", entityType);
