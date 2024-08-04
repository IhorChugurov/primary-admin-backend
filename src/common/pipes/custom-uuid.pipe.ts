import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { EntityType } from "../enums/entity-type.enum";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

@Injectable()
export class CustomUUIDPipe implements PipeTransform<string> {
  constructor(private readonly entityType: EntityType) {}

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      throw new BadRequestException(`${this.entityType} ID is missing`);
    }
    if (!this.isValidUUIDv4(value)) {
      throw new BadRequestException(`Invalid ${this.entityType} ID #${value}`);
    }

    return value;
  }
  private isValidUUIDv4(value: string): boolean {
    return uuidValidate(value) && uuidVersion(value) === 4;
  }
}
