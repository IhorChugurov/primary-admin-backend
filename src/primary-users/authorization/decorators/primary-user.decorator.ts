import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const PrimaryUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const primaryUser = req.primaryUser;

  return data ? primaryUser?.[data] : primaryUser;
});
