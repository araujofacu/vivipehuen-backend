
import { Injectable } from '@nestjs/common';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { UpdateComercioDto } from './dto/update-comercio.dto';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class ComerciosService {
  constructor(private readonly prisma: PrismaService) {} 

  create(dto: CreateComercioDto, propietarioId: number) {
    return this.prisma.comercio.create({
      data: {
        ...dto,
        propietarioId: propietarioId,
      },
    });
  }

  findAll() {
    return this.prisma.comercio.findMany();
  }

  findOne(id: number) {
    return this.prisma.comercio.findUnique({
      where: { id: id },
    });
  }

  update(id: number, dto: UpdateComercioDto) {
    return this.prisma.comercio.update({
      where: { id: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.comercio.delete({
      where: { id: id },
    });
  }
}
