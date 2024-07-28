export enum EntityKeys {
  USER = "user",
  PRIMARY_ROLE = "primaryRole",
  PROJECT = "project",
  PRIMARY_USER = "primaryUser",
  GROUP = "group",
  FACILITY = "facility",
  GROUP_ROLE = "groupRole",
  FACILITY_ROLE = "facilityRole",
}

interface ErrorMapping {
  [key: string]: string;
}

interface EntityErrorMappings {
  [EntityKeys.USER]: ErrorMapping;
  [EntityKeys.PROJECT]: ErrorMapping;
  [EntityKeys.PRIMARY_USER]: ErrorMapping;
  [EntityKeys.GROUP]: ErrorMapping;
  [EntityKeys.FACILITY]: ErrorMapping;
  [EntityKeys.GROUP_ROLE]: ErrorMapping;
  [EntityKeys.FACILITY_ROLE]: ErrorMapping;
  [EntityKeys.PRIMARY_ROLE]: ErrorMapping;
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
  [EntityKeys.PRIMARY_ROLE]: {
    "23505": "Primary role with this name already exists",
  },
};
