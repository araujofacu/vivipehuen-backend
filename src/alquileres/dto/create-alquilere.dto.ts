import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  IsNotEmpty,
  IsObject,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlquilerDto {
  @ApiProperty({
    description: 'Título llamativo para el anuncio',
    example: 'Hermosa Cabaña a 100m del mar',
  })
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  titulo: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la propiedad',
    example: 'Ideal para familias. Cuenta con jardín amplio...',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Capacidad máxima de huéspedes',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacidad?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @Min(1)
  @IsOptional()
  dormitorios?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsInt()
  @Min(1)
  @IsOptional()
  camas?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  petFriendly?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  pileta?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  parrilla?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  wifi?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  cochera?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  aireAcondicionado?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  vistaAlMar?: boolean;

  @ApiPropertyOptional({
    description: 'Distancia a la bajada de playa más cercana (en metros)',
    example: 150,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  distanciaPlaya?: number;

  @ApiPropertyOptional({
    description: 'Lista de URLs de las fotos de la propiedad',
    example: [
      'https://bucket.com/foto_frente.jpg',
      'https://bucket.com/foto_living.jpg',
    ],
  })
  @IsArray({ message: 'Fotos debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada foto debe ser un string (URL)' })
  @IsOptional()
  fotos?: string[];

  @ApiPropertyOptional({
    description: 'Objeto JSON flexible para detalles adicionales, reglas, etc.',
    example: {
      servicios: {
        wifi: 'Fibra óptica 300mb',
        tv: 'Smart TV 55" con Netflix y Disney+',
        ropaBlanca: 'Incluye sábanas y toallas (1 juego por huésped)',
      },
      distribucion: {
        dormitorio1: 'Cama Queen en suite',
        dormitorio2: 'Dos camas individuales',
      },
      reglas: {
        checkIn: '15:00',
        checkOut: '10:00',
        fiestas: false,
      },
    },
  })
  @IsObject({ message: 'Los detalles deben ser un objeto JSON' })
  @IsOptional()
  detalles?: object;
}
