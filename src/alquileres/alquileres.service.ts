
import { Injectable } from '@nestjs/common';
import { CreateAlquilerDto } from './dto/create-alquilere.dto';
import { UpdateAlquilerDto } from './dto/update-alquilere.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlquileresService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAlquilerDto, propietarioId: number) { 
    return this.prisma.alquiler.create({
      data: {
        ...dto,
        propietarioId: propietarioId,
      },
    });
  }

  findAll() {
    return this.prisma.alquiler.findMany();
  }

  findOne(id: number) {
    return this.prisma.alquiler.findUnique({
      where: { id: id },
    });
  }

  update(id: number, dto: UpdateAlquilerDto) { 
    return this.prisma.alquiler.update({
      where: { id: id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.alquiler.delete({
      where: { id: id },
    });
  }
}
