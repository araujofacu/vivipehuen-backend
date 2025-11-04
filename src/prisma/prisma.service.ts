// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
// Importamos el cliente que Prisma generó para nosotros
import { PrismaClient } from '@prisma/client';

/**
 * @Injectable() es el decorador que le dice a NestJS:
 * "Esta clase puede ser 'inyectada' en otras clases (como Controllers o Services)".
 * Es la pieza central del sistema de Inyección de Dependencias.
 */
@Injectable()
/**
 * Hacemos que nuestro servicio EXTIENDA (herede de) PrismaClient.
 * Traducción: Nuestro PrismaService AHORA ES el cliente de Prisma.
 * Tendrá todos los métodos como this.user.findMany(), this.user.create(), etc.
 * * También implementamos 'OnModuleInit', que es un "hook" de ciclo de vida de Nest.
 */
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  /**
   * 'OnModuleInit' es un método obligatorio de la interfaz 'OnModuleInit'.
   * NestJS lo llamará automáticamente UNA VEZ que este módulo se haya cargado.
   * * Traducción: Es como una señal de Django (ej. post_migrate) o un hook
   * que se ejecuta "justo cuando la app arranca".
   */
  async onModuleInit() {
    // Aquí le decimos a Prisma que se conecte explícitamente a la BBDD
    // al iniciar la aplicación. Es una buena práctica.
    await this.$connect();
  }

  // Opcional: Puedes añadir un hook para desconectarse al cerrar la app
  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
}