import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    skipMissingProperties: true
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
