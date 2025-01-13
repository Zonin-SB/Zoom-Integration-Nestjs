import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws error for properties not defined in the DTO
      transform: true, // Automatically transforms query params to DTO types
    }),
  );
  await app.listen(3000);
}
bootstrap();
