import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './commom/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './commom/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //recusa requisições daquilo que esta fora da whitelist
      forbidNonWhitelisted: true,
      //transforma os dados da requisição de acordo com o DTO
      transform: true,
    }),
  );
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
