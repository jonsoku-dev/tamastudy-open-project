import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const serverConfig: { port: number } = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || serverConfig.port;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
