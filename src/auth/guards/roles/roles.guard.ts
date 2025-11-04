// src/auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

/**
 * 🐍 TRADUCCIÓN: Esta es tu 'class IsAdminUser(permissions.BasePermission):'
 *
 * Un 'Guard' es una clase que implementa 'CanActivate'.
 * NestJS llamará a 'canActivate()' antes de ejecutar el
 * método del controlador.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * 'Reflector' es una utilidad de NestJS que nos permite
   * leer "metadatos" personalizados que pondremos en
   * nuestros controladores (ej. '@Roles(Role.ADMIN)').
   */
  constructor(private reflector: Reflector) {}

  /**
   * 🐍 TRADUCCIÓN: Este es tu 'def has_permission(self, request, view):'
   */
  canActivate(context: ExecutionContext): boolean {
    // 1. Obtiene los roles REQUERIDOS del decorador (ej. 'ADMIN')
    // 'roles' es la clave de metadatos que usaremos en nuestro decorador
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(), // Lee metadatos del método
      context.getClass(), // Lee metadatos de la clase
    ]);

    // 2. Si el endpoint no especificó roles, permite el acceso
    // (Es como si no hubieras puesto 'IsAdminUser' en la vista)
    if (!requiredRoles) {
      return true;
    }

    // 3. 🐍 Obtiene el 'request.user' (¡igual que en DRF!)
    // (Esto asume que el 'AuthGuard' (jwt) ya se ejecutó ANTES)
    const { user } = context.switchToHttp().getRequest();

    // 4. 🐍 La lógica de permiso:
    // "El rol del usuario está incluido en la lista de roles requeridos?"
    // (ej. ¿'PROPIETARIO' está en ['ADMIN']? No -> 403 Forbidden)
    return requiredRoles.some((role) => user.role === role);
  }
}