import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: ['http://localhost:3000'],
      credentials: true,
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
