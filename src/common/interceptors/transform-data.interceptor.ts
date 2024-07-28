import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DTO } from "../decorators/dto.decorator";

@Injectable()
export class TransformDataInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const contextType = context.getClass();
        const handler = context.getHandler();
        const dto = Reflect.getMetadata(DTO, handler) || Reflect.getMetadata(DTO, contextType);

        if (dto) {
          return plainToInstance(dto, data, {
            excludeExtraneousValues: true,
          });
        }

        return data;
      }),
    );
  }
}
