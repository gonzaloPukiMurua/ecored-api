/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { User } from '../../user/entities/user.entity';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async generateToken(user: User) {
    if (!user) {
      throw new BadRequestException('No se pudo generar token ');
    }
    const token = await this.jwtService.signAsync(
      {
        //payload
        sub: user.user_id,
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      {
        //secrets
        audience: this.jwtConfiguration.audience,
        secret: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return token ;
  }
}