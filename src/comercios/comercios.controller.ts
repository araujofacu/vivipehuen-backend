
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
import { ComerciosService } from './comercios.service';
import { CreateComercioDto } from './dto/create-comercio.dto';
import { UpdateComercioDto } from './dto/update-comercio.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { OwnerGuard } from './guards/owner/owner.guard'; 

@Controller('comercios')
export class ComerciosController {
  constructor(private readonly comerciosService: ComerciosService) {}

  @Post()
  @Roles(Role.COMERCIO)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createComercioDto: CreateComercioDto, @Req() req) {
    const propietarioId = req.user.id;
    return this.comerciosService.create(createComercioDto, propietarioId);
  }

  @Get()
  findAll() {
    return this.comerciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comerciosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), OwnerGuard) 
  update(
    @Param('id') id: string,
    @Body() updateComercioDto: UpdateComercioDto,
  ) {
    return this.comerciosService.update(+id, updateComercioDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), OwnerGuard) 
  remove(@Param('id') id: string) {
    return this.comerciosService.remove(+id);
  }
}
