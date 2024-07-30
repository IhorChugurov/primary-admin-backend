export enum EntityKeys {
  USER = "user",
  PROJECT = "project",
  PRIMARY_USER = "primaryUser",
  PRIMARY_ROLE = "primaryRole",
  GROUP = "group",
  FACILITY = "facility",
  GROUP_ROLE = "groupRole",
  FACILITY_ROLE = "facilityRole",
  GROUP_USER = "groupUser",
  FACILITY_USER = "facilityUser",
  ENVIRONMENT = "environment",
}

interface ErrorMapping {
  [key: string]: string;
}

interface EntityErrorMappings {
  [EntityKeys.USER]: ErrorMapping;
  [EntityKeys.PROJECT]: ErrorMapping;
  [EntityKeys.PRIMARY_USER]: ErrorMapping;
  [EntityKeys.PRIMARY_ROLE]: ErrorMapping;
  [EntityKeys.GROUP]: ErrorMapping;
  [EntityKeys.FACILITY]: ErrorMapping;
  [EntityKeys.GROUP_ROLE]: ErrorMapping;
  [EntityKeys.FACILITY_ROLE]: ErrorMapping;
  [EntityKeys.GROUP_USER]: ErrorMapping;
  [EntityKeys.FACILITY_USER]: ErrorMapping;
  [EntityKeys.ENVIRONMENT]: ErrorMapping;
}

export const sharedErrorMappings: ErrorMapping = {
  "23505": "Duplicate entry error",
};

export const entitySpecificErrorMappings: EntityErrorMappings = {
  [EntityKeys.USER]: {
    "23505": "User with this email already exists",
  },
  [EntityKeys.PROJECT]: {
    "23505": "Project with this name already exists",
  },
  [EntityKeys.PRIMARY_USER]: {
    "23505": "User with this email already admin",
  },
  [EntityKeys.PRIMARY_ROLE]: {
    "23505": "Primary role with this name already exists",
  },
  [EntityKeys.GROUP]: {
    "23505": "Group with this name already exists",
  },
  [EntityKeys.FACILITY]: {
    "23505": "Facility with this name already exists",
  },
  [EntityKeys.GROUP_ROLE]: {
    "23505": "Group role with this name already exists",
  },
  [EntityKeys.FACILITY_ROLE]: {
    "23505": "Facility role with this name already exists",
  },
  [EntityKeys.GROUP_USER]: {
    "23505": "Group user with this name already exists",
  },
  [EntityKeys.FACILITY_USER]: {
    "23505": "Facility user with this name already exists",
  },
  [EntityKeys.ENVIRONMENT]: {
    "23505": "Environment with this key already exists",
  },
};
