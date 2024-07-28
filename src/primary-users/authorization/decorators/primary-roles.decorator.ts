import { SetMetadata } from "@nestjs/common";

export const PRIMARY_ROLES_KEY = "roles";
// TODO сделать проверку не просто по строке, а вынести предуставленные роли в отдельный файл
export const Roles = (...roles: string[]) => SetMetadata(PRIMARY_ROLES_KEY, roles);
