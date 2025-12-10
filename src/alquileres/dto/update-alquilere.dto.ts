
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlquilerDto } from './create-alquilere.dto';

export class UpdateAlquilerDto extends PartialType(CreateAlquilerDto) {}
