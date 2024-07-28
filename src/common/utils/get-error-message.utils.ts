import {
  EntityKeys,
  entitySpecificErrorMappings,
  sharedErrorMappings,
} from "../../database/constants/database-error-mappings.constant";

export function getErrorMessage(error: any, entity: EntityKeys): string | null {
  if (error?.code) {
    return (
      entitySpecificErrorMappings[entity]?.[error.code] || sharedErrorMappings[error.code] || null
    );
  }
  return null;
}
