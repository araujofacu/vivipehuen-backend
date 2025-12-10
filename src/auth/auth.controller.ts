
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';

import { Role } from '@prisma/client';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  getProfile(@Req() req) {
    return req.user;
  }
}
