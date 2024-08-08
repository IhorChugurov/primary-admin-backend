import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomUUIDPipe } from "../pipes/custom-uuid.pipe";
import { EntityType } from "../enums/entity-type.enum";

/**
 * A custom parameter decorator that extracts and validates a EntityDefinition UUID from the 'entityDefinitionId' query parameter of the request.
 * It applies a CustomUUIDPipe to transform and validate the extracted UUID.
 *
 * @returns The validated EntityDefinition UUID as a string
 *
 * @remarks
 * This decorator always extracts the EntityDefinition UUID from the 'entityDefinitionId' query parameter.
 * Ensure that the 'entityDefinitionId' is included in the request query parameters for this decorator to function properly.
 */
export const EntityDefinitionId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const entityDefinitionId = request.query.entityDefinitionId;
  return new CustomUUIDPipe(EntityType.ENTITY_DEFINITION).transform(entityDefinitionId, {
    type: "query",
    metatype: String,
    data: "entityDefinitionId",
  });
});
