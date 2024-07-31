import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsMultiType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isMultiType",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === "boolean" ||
            typeof value === "string" ||
            typeof value === "number" ||
            value instanceof Date
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a boolean, string, number, or Date`;
        },
      },
    });
  };
}
