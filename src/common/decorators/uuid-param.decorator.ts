import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomUUIDPipe } from "../pipes/custom-uuid.pipe";

/**
 * A custom parameter decorator that extracts and validates a UUID from the 'id' field of the request parameters.
 * It applies a CustomUUIDPipe to transform and validate the extracted UUID.
 *
 * @returns The validated UUID as a string
 *
 * @remarks
 * This decorator always extracts the UUID from the 'id' field of the request parameters.
 * If the route uses a different parameter name, this decorator will not work as expected.
 */
export const UUIDParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const id = request.params.id;

  const handler = ctx.getHandler();
  const entityType = Reflect.getMetadata("entityType", handler.constructor);

  return new CustomUUIDPipe(entityType).transform(id, {
    type: "param",
    metatype: String,
    data: "id",
  });
});
