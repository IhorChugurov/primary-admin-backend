import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { REQUEST_USER_KEY } from "../../../iam/iam.constants";
import { ActiveUserData } from "../../../iam/interfaces/active-user-data.interface";
import { PRIMARY_ROLES_KEY } from "../decorators/primary-roles.decorator";
import { PrimaryUsersService } from "src/primary-users/primary-users.service";

@Injectable()
export class PrimaryRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly primaryUsersService: PrimaryUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const contextRoles = this.reflector.getAllAndOverride<string[]>(PRIMARY_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!contextRoles) {
      return true;
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[REQUEST_USER_KEY];

    // Checking User access to the admin panel.
    const primaryUser = await this.primaryUsersService.findOneByUserIdWithRelations(user.sub, [
      "user",
      "primaryRole",
    ]);

    if (!primaryUser) {
      throw new ForbiddenException();
    }

    req.primaryUser = primaryUser;

    // TODO сделать проверку не просто по строке, а вынести предуставленные роли в отдельный файл

    return contextRoles.some((role) => primaryUser.primaryRole.name === role);
  }
}
