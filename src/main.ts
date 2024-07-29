import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TypeOrmExceptionFilter } from "./common/filters/typeorm-exception.filter";
import { ConfigService } from "@nestjs/config";
import { TransformDataInterceptor } from "./common/interceptors/transform-data.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only the properties defined in the DTO classes are allowed through.
      transform: true, // Automatically transforms the plain JavaScript objects into instances of the DTO classes.
      transformOptions: { enableImplicitConversion: true }, // Automatically converts plain values to the specified types.
    }),
  );
  // TODO перекрывают ли костомные фильтры, базовый фильтр нест? Как работает их взаимосвязь?
  // TODO создать фильтры для всех типов ошибок
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeOrmExceptionFilter());
  app.useGlobalInterceptors(new TransformDataInterceptor());
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3001);

  await app.listen(port, () => console.log(`Server started on port = ${port}`));
}
bootstrap();
