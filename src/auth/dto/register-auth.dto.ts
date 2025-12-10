import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'El correo electrónico único del usuario',
    example: 'nuevo_usuario@ejemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario (mínimo 8 caracteres)',
    example: 'S3cretPassw0rd!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiPropertyOptional({
    description: 'El nombre completo del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'El rol del usuario en la plataforma',
    enum: Role,
    example: Role.PROPIETARIO,
    default: Role.PROPIETARIO,
  })
  @IsEnum(Role, { message: 'Rol inválido. Debe ser PROPIETARIO o COMERCIO' })
  @IsOptional()
  role?: Role;
}