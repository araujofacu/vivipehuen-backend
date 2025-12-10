
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AlquileresService } from './alquileres.service';
import { CreateAlquilerDto } from './dto/create-alquilere.dto';
import { UpdateAlquilerDto } from './dto/update-alquilere.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { OwnerGuard } from './guards/owner/owner.guard'; 

@Controller('alquileres')
export class AlquileresController {
  constructor(private readonly alquileresService: AlquileresService) {}

  @Post()
  @Roles(Role.PROPIETARIO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createAlquilerDto: CreateAlquilerDto, @Req() req) {
    const propietarioId = req.user.id;
    return this.alquileresService.create(createAlquilerDto, propietarioId);
  }

  @Get()
  findAll() {
    return this.alquileresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alquileresService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), OwnerGuard) 
  update(
    @Param('id') id: string,
    @Body() updateAlquilerDto: UpdateAlquilerDto,
  ) {
    return this.alquileresService.update(+id, updateAlquilerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), OwnerGuard) 
  remove(@Param('id') id: string) {
    return this.alquileresService.remove(+id);
  }
}
