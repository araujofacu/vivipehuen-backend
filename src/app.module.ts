// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

// 1. ¡NUEVO! Importa el módulo de configuración
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 2. ¡NUEVO! Regístralo aquí.
    // Esto le dice a NestJS que lea tu archivo .env
    // y lo haga disponible globalmente.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // --- Estos ya los tenías ---
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}