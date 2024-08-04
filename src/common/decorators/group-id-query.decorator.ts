import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomUUIDPipe } from "../pipes/custom-uuid.pipe";
import { EntityType } from "../enums/entity-type.enum";

/**
 * A custom parameter decorator that extracts and validates a Group UUID from the 'groupId' query parameter of the request.
 * It applies a CustomUUIDPipe to transform and validate the extracted UUID.
 *
 * @returns The validated Group UUID as a string
 *
 * @remarks
 * This decorator always extracts the Group UUID from the 'groupId' query parameter.
 * Ensure that the 'groupId' is included in the request query parameters for this decorator to function properly.
 */
export const GroupId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const groupId = request.query.groupId;
  return new CustomUUIDPipe(EntityType.GROUP).transform(groupId, {
    type: "query",
    metatype: String,
    data: "groupId",
  });
});
