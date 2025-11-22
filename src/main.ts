import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // CORS para peticiones
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Prueba Tecnica API')
    .setDescription('Prueba Tecnica API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Scalar
  const { apiReference } = await import('@scalar/nestjs-api-reference');
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    } as any),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Servidor corriendo en: http://localhost:${port}`);
  logger.log(`Swagger UI: http://localhost:${port}/docs`);
  logger.log(`Scalar UI: http://localhost:${port}/reference`);
}
bootstrap();
