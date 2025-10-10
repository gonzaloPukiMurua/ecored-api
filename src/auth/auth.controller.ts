/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginUserDto } from 'src/user/DTOs/login-user.dto';
import { CreateUserDto } from 'src/user/DTOs/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
    const token = await this.authService.login(loginUserDto);
    console.log(token)
    return {access_token: token}
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto){
    console.log("Estoy en auth/register")
    return await this.authService.register(createUserDto);
  }

}
