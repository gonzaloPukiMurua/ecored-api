/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginUserDto } from 'src/user/DTOs/login-user.dto';
import { CreateUserDto } from 'src/user/DTOs/create-user.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import type { Request } from 'express';
import { REQUEST_USER_KEY } from './constants/auth.constants';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse
} from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {}
  @Auth(AuthType.None)
  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión de usuarios en la app' })
  @ApiCreatedResponse({
    description: 'Token creado exitosamente',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  async login(@Body() loginUserDto: LoginUserDto){
    console.log("Estoy en auth.controller login, este es el loginUserDTO: ", loginUserDto);
    const token = await this.authService.login(loginUserDto);
    console.log(token);
    return token
  }

  @Auth(AuthType.None)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    console.log("Estoy en auth/register")
    return await this.authService.register(createUserDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtiene a usuario actual' })
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({
    description: 'Usuario actual',
    //type: UserResponseDto,
  })
  async getMyProfile(@Req() request: Request){
    try {
      const userPayload = request[REQUEST_USER_KEY] as JwtPayload;
      if (!userPayload) {
        return { message: 'Usuario no autenticado' };
      }
      const user = await this.userService.findUserById(userPayload.user_id);
      if (!user) {
        return { message: 'Usuario no encontrado' };
      }
      return user;
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
      return { message: 'Error interno del servidor' };
    }
  }
}
