// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Importa el ValidationPipe
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. 🐍 Activa el Pipe Global (Tu "Middleware de Validación")
  app.useGlobalPipes(
    new ValidationPipe({
      // 🐍 whitelist: true
      // TRADUCCIÓN: Esto es como un Serializer de DRF.
      // Si el JSON de entrada tiene campos que NO están en el DTO,
      // los eliminará automáticamente en lugar de dar error.
      // ¡Es una mejor práctica de seguridad!
      whitelist: true,
      
      // (Opcional) forbidNonWhitelisted: true
      // Si es 'true', en lugar de eliminar campos extraños,
      // lanzará un error 400. (Más estricto).
    }),
  );

  await app.listen(3000);
}
bootstrap();