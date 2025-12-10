
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException, 
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; 

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('No estás autenticado');
    }

    const alquilerId = parseInt(request.params.id, 10);
    if (isNaN(alquilerId)) {
      throw new ForbiddenException('ID de alquiler inválido');
    }

    const alquiler = await this.prisma.alquiler.findUnique({
      where: { id: alquilerId },
      select: { propietarioId: true },
    });

    if (!alquiler) {
      throw new ForbiddenException('El alquiler no existe');
    }

    const esElDueño = alquiler.propietarioId === user.id;

    if (!esElDueño) {
      throw new ForbiddenException('No tienes permiso para editar este alquiler');
    }

    return true;
  }
}
