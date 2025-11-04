// src/auth/dto/register-auth.dto.ts
import { Role } from '@prisma/client'; // ¡Importamos nuestro enum de Prisma!
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

/*
 * 🐍 TRADUCCIÓN: Esto es tu "class RegisterSerializer(serializers.Serializer):"
 * * Es una CLASE simple de TypeScript que usa DECORADORES
 * para definir las reglas de validación.
 */
export class RegisterAuthDto {
  /*
   * @IsEmail() es tu "serializers.EmailField()"
   * @IsString() es tu "serializers.CharField()"
   */
  @IsEmail()
  email: string;

  /*
   * @MinLength(8) es tu "serializers.CharField(min_length=8)"
   */
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  /*
   * @IsOptional() es tu "serializers.CharField(required=False)"
   */
  @IsString()
  @IsOptional()
  name?: string; // El '?' en TypeScript significa que es opcional

  /*
   * @IsEnum(Role) es tu "serializers.ChoiceField(choices=Role.choices)"
   * Validará que el valor sea 'PROPIETARIO' o 'COMERCIO'.
   * (No queremos que se puedan registrar como 'ADMIN')
   */
  @IsEnum(Role, { message: 'Rol inválido. Debe ser PROPIETARIO o COMERCIO' })
  @IsOptional() // Lo haremos opcional, si no viene, será PROPIETARIO (por el default de Prisma)
  role?: Role;
}
