import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomUUIDPipe } from "../pipes/custom-uuid.pipe";
import { EntityType } from "../enums/entity-type.enum";

/**
 * A custom parameter decorator that extracts and validates a Facility UUID from the 'facilityId' query parameter of the request.
 * It applies a CustomUUIDPipe to transform and validate the extracted UUID.
 *
 * @returns The validated Facility UUID as a string
 *
 * @remarks
 * This decorator always extracts the Facility UUID from the 'facilityId' query parameter.
 * Ensure that the 'facilityId' is included in the request query parameters for this decorator to function properly.
 */
export const FacilityId = createParamDecorator(
  (options: { required: boolean } = { required: true }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const facilityId = request.query.facilityId;
    return new CustomUUIDPipe(EntityType.FACILITY, options.required).transform(facilityId, {
      type: "query",
      metatype: String,
      data: "facilityId",
    });
  },
);
