// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

// 1. ¡NUEVO! Importa el Role y nuestro Guard/Decorador
import { Role } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // --- Endpoint de Registro (sin cambios) ---
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  // --- Endpoint de Login (sin cambios) ---
  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  /**
   * -------------------------------------------------
   * 🐍 ¡MODIFICADO! Tu endpoint protegido, AHORA con Roles
   * -------------------------------------------------
   */
  @Get('profile')
  /**
   * 🐍 ¡AQUÍ ESTÁ LA MAGIA! (Tu '@permission_classes')
   *
   * 1. @Roles(Role.ADMIN)
   * (La "configuración" para el Guard)
   * Le dice al RolesGuard: "Este endpoint REQUIERE el rol 'ADMIN'".
   *
   * 2. @UseGuards(AuthGuard('jwt'), RolesGuard)
   * (Tu '[IsAuthenticated, IsAdminUser]')
   * NestJS ejecuta los Guards en orden:
   * a) AuthGuard('jwt'): ¿Es un token válido? (IsAuthenticated)
   * -> Si no: 401 Unauthorized
   * b) RolesGuard: ¿El 'req.user.role' coincide con lo de @Roles?
   * -> Si no: 403 Forbidden
   */
  
  @Roles(Role.ADMIN) // <-- 1. ¡NUEVO! Especifica el rol REQUERIDO
  @UseGuards(AuthGuard('jwt'), RolesGuard) // <-- 2. ¡NUEVO! Añade el RolesGuard
  getProfile(@Req() req) {
    // Si llega aquí, es un ADMIN autenticado
    return req.user;
  }
}