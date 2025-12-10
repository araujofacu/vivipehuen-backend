
import {
  Injectable,
  ConflictException,
  UnauthorizedException, 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 
import { LoginAuthDto } from './dto/login-auth.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, 
  ) {}

  async register(dto: RegisterAuthDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: dto.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('El correo electrónico ya está registrado.');
      }
      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: user.id, 
      email: user.email,
      role: user.role, 
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      accessToken: accessToken,
    };
  }
}
