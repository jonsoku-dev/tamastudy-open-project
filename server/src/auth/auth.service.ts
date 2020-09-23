import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './repositories/auth.repository';
import { RegisterRequest } from './request/register.request';
import { Auth } from './entities/auth.entity';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './request/login.request';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async register(registerRequest: RegisterRequest): Promise<Auth> {
    return await this.authRepository.register(registerRequest);
  }

  async login(loginRequest: LoginRequest) {
    const user = await this.authRepository.validateUserPassword(loginRequest);
    const payload: IJwtPayload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  follow(targetUserId: string, currentUserId: string) {
    return this.authRepository.follow(targetUserId, currentUserId);
  }

  unFollow(targetUserId: string, currentUserId: string) {
    return this.authRepository.unFollow(targetUserId, currentUserId);
  }
}
