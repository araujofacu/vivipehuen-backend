// src/auth/auth.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException, // ¡NUEVO! Importa la excepción 401
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // ¡NUEVO! Importa tu "SimpleJWT"
import { LoginAuthDto } from './dto/login-auth.dto'; // ¡NUEVO! Importa el DTO de Login

@Injectable()
export class AuthService {
  /**
   * 🐍 ¡NUEVO! Inyección de Dependencias
   * Ahora, además de 'PrismaService', también "pedimos"
   * el 'JwtService' que configuramos en el 'AuthModule'.
   */
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // ¡NUEVO!
  ) {}

  /**
   * Este es tu método de REGISTRO (ya lo tenías)
   */
  async register(dto: RegisterAuthDto) {
    // ---- 1. Hashear la contraseña ----
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    // ---- 2. Guardar en la BBDD ----
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: dto.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      // ---- 3. Manejo de Errores ----
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('El correo electrónico ya está registrado.');
      }
      throw error;
    }
  }

  /**
   * -------------------------------------------------
   * 🐍 ¡NUEVO! Este es tu 'authenticate()' + 'TokenObtainPairView'
   * -------------------------------------------------
   */
  async login(dto: LoginAuthDto) {
    // ---- 1. Autenticación (Tu 'authenticate(email, password)') ----

    // a. Buscar al usuario
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // b. Comparar contraseñas
    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // ---- 2. Generación de Token (Tu 'RefreshToken.for_user(user)') ----

    const payload = {
      sub: user.id, // 'sub' es el ID del usuario
      email: user.email,
      role: user.role, // ¡Importante para los permisos!
    };

    // Firmamos el token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      accessToken: accessToken,
    };
  }
}