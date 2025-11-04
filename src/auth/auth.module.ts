// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 1. ¡NUEVO! Importa el motor de Passport
import { PassportModule } from '@nestjs/passport';
// 2. ¡NUEVO! Importa nuestra Estrategia
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // 3. ¡NUEVO! Registra Passport (tu 'rest_framework.authentication')
    // Le decimos que nuestra ESTRATEGIA por defecto se llama 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // --- Esto ya lo tenías (tu 'SimpleJWT' config) ---
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    // -------------------------------------------------
  ],
  controllers: [AuthController],
  // 4. ¡NUEVO! Registra nuestra JwtStrategy como un "Provider"
  // (para que NestJS pueda encontrarla y usarla)
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}