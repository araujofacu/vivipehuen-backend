// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * 🐍 @Global()
 * TRADUCCIÓN: Este decorador es la magia.
 * Es como decirle a Django: "Este servicio (PrismaService)
 * no pertenece a una sola app, quiero que esté disponible
 * para TODAS mis apps (Auth, Alquileres, Comercios, etc.)
 * sin tener que importarlo en cada una."
 */
@Global()
@Module({
  // Registra el servicio
  providers: [PrismaService],
  // ¡Exporta el servicio para que otros módulos puedan usarlo!
  exports: [PrismaService],
})
export class PrismaModule {}