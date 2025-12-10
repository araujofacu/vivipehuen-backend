import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'El email del usuario registrado',
    example: 'propietario1@prueba.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'S3cretPassw0rd!',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;
}