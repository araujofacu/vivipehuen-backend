// src/auth/dto/login-auth.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/*
 * 🐍 TRADUCCIÓN: Esto es tu "class LoginSerializer(serializers.Serializer):"
 */
export class LoginAuthDto {
  /*
   * email = serializers.EmailField()
   */
  @IsEmail()
  email: string;

  /*
   * password = serializers.CharField()
   * (No necesitamos MinLength aquí, solo que no esté vacío)
   */
  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;
}