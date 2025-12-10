
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

    const comercioId = parseInt(request.params.id, 10);
    if (isNaN(comercioId)) {
      throw new ForbiddenException('ID de comercio inválido');
    }

    const comercio = await this.prisma.comercio.findUnique({
      where: { id: comercioId },
      select: { propietarioId: true },
    });

    if (!comercio) {
      throw new ForbiddenException('El comercio no existe');
    }

    const esElDueño = comercio.propietarioId === user.id;

    if (!esElDueño) {
      throw new ForbiddenException('No tienes permiso para editar este comercio');
    }

    return true;
  }
}
