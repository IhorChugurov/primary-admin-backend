import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from "@nestjs/common";
import { TypeORMError } from "typeorm";

// TODO улучшить отображение

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };

    response.status(status).json(errorResponse);
  }
}
