// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

/**
 * 🐍 TRADUCCIÓN:
 * Esto es un simple "ayudante" que nos permite escribir
 * '@Roles(Role.ADMIN)' encima de un endpoint.
 *
 * Todo lo que hace es 'SetMetadata('roles', [Role.ADMIN])',
 * que es lo que nuestro 'RolesGuard' (con el 'Reflector')
 * buscará.
 */
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);