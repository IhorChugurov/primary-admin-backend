import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { isUUID } from "class-validator";

export const ProjectId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const projectId = request.headers["projectid"];

  if (!projectId) {
    throw new BadRequestException("Project id header is missing");
  }

  if (!isUUID(projectId)) {
    throw new BadRequestException("Invalid project id");
  }

  return projectId;
});
