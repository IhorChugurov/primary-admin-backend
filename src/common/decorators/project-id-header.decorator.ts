import { createParamDecorator, ExecutionContext, Paramtype } from "@nestjs/common";
import { EntityType } from "../enums/entity-type.enum";
import { CustomUUIDPipe } from "../pipes/custom-uuid.pipe";

/**
 * A custom parameter decorator that extracts and validates a Project UUID from the 'projectId' header of the request.
 * It applies a CustomUUIDPipe to transform and validate the extracted UUID.
 *
 * @returns The validated Project UUID as a string
 *
 * @remarks
 * This decorator always extracts the Project UUID from the 'projectId' header.
 * Ensure that the 'projectId' is included in the request headers for this decorator to function properly.
 */
export const ProjectId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const projectId = request.headers.projectid;
  console.log(request.headers);
  return new CustomUUIDPipe(EntityType.PROJECT).transform(projectId, {
    type: "custom" as Paramtype,
    metatype: String,
    data: "projectId",
  });
});
