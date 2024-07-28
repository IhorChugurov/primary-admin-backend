import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { getErrorMessage } from "src/common/utils/get-error-message.utils";
import { EntityKeys } from "../constants/database-error-mappings.constant";

export function handleDatabaseErrors(error: any, entity: EntityKeys): never {
  const errorMessage = getErrorMessage(error, entity);
  if (errorMessage) {
    throw new ConflictException(errorMessage);
  }
  throw new InternalServerErrorException("Unexpected database error");
}
