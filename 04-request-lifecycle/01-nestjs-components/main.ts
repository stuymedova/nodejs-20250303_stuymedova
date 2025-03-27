import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpErrorFilter } from "./filters/http-error.filter";
import { ApiVersionInterceptor } from "./interceptors/api-version.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new ApiVersionInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
