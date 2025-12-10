import {
  IsString,
  IsOptional,
  IsArray,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComercioDto {
  @ApiProperty({
    description: 'El nombre comercial del negocio',
    example: 'Parador El Faro',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción atractiva para los turistas',
    example:
      'El mejor lugar para disfrutar del atardecer con rabas y cerveza artesanal.',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Galería de fotos del local y productos',
    example: [
      'https://bucket.com/frente_local.jpg',
      'https://bucket.com/plato_rabas.jpg',
    ],
  })
  @IsArray({ message: 'Fotos debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada foto debe ser un string (URL)' })
  @IsOptional()
  fotos?: string[];

  @ApiPropertyOptional({
    description: 'Días y horarios de atención',
    example: 'Todos los días de 09:00 a 01:00. Cocina cierra 23:30.',
  })
  @IsString()
  @IsOptional()
  horarios?: string;

  @ApiPropertyOptional({
    description: 'Lista de métodos de pago aceptados',
    example: ['Efectivo', 'Mercado Pago', 'Tarjeta de Débito', 'Visa Crédito'],
  })
  @IsArray({ message: 'Medios de pago debe ser un array de strings' })
  @IsString({
    each: true,
    message: 'Cada medio de pago debe ser un string',
  })
  @IsOptional()
  mediosDePago?: string[];

  @ApiPropertyOptional({
    description: 'Enlaces de contacto y redes sociales',
    example: {
      instagram: '@paradorelfaro',
      whatsapp: '5492911234567',
      facebook: '/paradorelfaro.pehuen',
      web: 'www.paradorelfaro.com.ar',
      menuDigital: 'https://menu.com/elfaro',
    },
  })
  @IsObject({ message: 'Links debe ser un objeto JSON' })
  @IsOptional()
  links?: object;
}
