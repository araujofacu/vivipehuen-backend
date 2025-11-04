// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

/**
 * 🐍 TRADUCCIÓN:
 * Esta clase es tu "backend de autenticación JWTAuthentication" de DRF.
 * Su único trabajo es leer el token, validarlo y devolver
 * el objeto 'user' que se adjuntará a 'request.user'.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * 'jwt' (el segundo argumento) es el nombre por defecto
   * de esta estrategia. Lo usaremos luego en el Guard.
   */

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService, // Inyectamos Prisma para buscar al usuario
  ) {
    super({
      // 1. 🐍 Dónde buscar el token (Tu 'AUTH_HEADER_TYPES = ("Bearer",)')
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 2. 🐍 No fallar si el token expiró (lo manejamos nosotros)
      ignoreExpiration: false,

      // 3. 🐍 El Secreto (Tu 'SECRET_KEY' de Django)
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * 4. 🐍 El "Núcleo" Mágico (Tu 'request.user')
   * Passport llama a esta función DESPUÉS de validar el token.
   * El 'payload' es el JSON que pusimos DENTRO del token
   * (recuerda: { sub: user.id, email: ..., role: ... })
   *
   * Lo que devolvamos aquí... ¡NestJS lo pondrá en 'request.user'!
   */
  async validate(payload: { sub: number; email: string; role: string }) {
    // a. Buscamos al usuario en la BBDD (Tu 'User.objects.get(pk=payload.sub)')
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // b. Si el usuario fue borrado después de emitir el token
    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado');
    }

    // c. ¡Éxito! Devolvemos el usuario
    // (Omitimos el password por seguridad)
    const { password, ...result } = user;
    return result; // <--- ¡ESTO se convierte en 'req.user'!
  }
}