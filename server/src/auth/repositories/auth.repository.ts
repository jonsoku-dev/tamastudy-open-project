import { EntityRepository, Repository } from 'typeorm/index';
import { Auth } from '../entities/auth.entity';
import { RegisterRequest } from '../request/register.request';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginRequest } from '../request/login.request';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  private logger = new Logger('AuthRepository');

  async register(registerRequest: RegisterRequest): Promise<Auth> {
    const { username, email, password } = registerRequest;
    const user = new Auth();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.generateJdenticon();
    try {
      await user.save();
      this.logger.verbose(`register success`);
      return user;
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        this.logger.error('register duplicate error');
        throw new ConflictException('register duplicate error');
      } else {
        this.logger.error(`register error`);
        throw new InternalServerErrorException('register error');
      }
    }
  }

  async validateUserPassword(loginRequest: LoginRequest) {
    const { email, password } = loginRequest;
    const user = await Auth.findOne({ where: { email } });
    if (user && (await user.validatePassword(password))) {
      this.logger.verbose('validateUserPassword success');
      return user;
    } else {
      this.logger.error('validateUserPassword error');
      throw new InternalServerErrorException('validateUserPassword error');
    }
  }

  async follow(targetUserId: string, currentUserId: string) {
    try {
      const query = this.createQueryBuilder('auth_followers');
      await query
        .cache(true)
        .insert()
        .into('auth_followers')
        .values({
          followingId: targetUserId,
          followerId: currentUserId,
        })
        .execute();
      this.logger.verbose('follow success');
      return await this.findOne({ where: { id: targetUserId } });
    } catch (e) {
      if (e.code === '23505') {
        this.logger.error('follow duplicate error');
        throw new ConflictException('follow duplicate error');
      } else {
        this.logger.error('follow error');
        throw new InternalServerErrorException('follow error');
      }
    }
  }

  async unFollow(targetUserId: string, currentUserId: string) {
    const query = this.createQueryBuilder('auth_followers');
    const result = await query
      .cache(true)
      .andWhere('followerId = :currentUserId', { currentUserId })
      .andWhere('followingId = :targetUserId', { targetUserId })
      .delete()
      .from('auth_followers')
      .execute();
    if (result.affected === 0) {
      this.logger.verbose('unFollow error');
      throw new InternalServerErrorException('팔로잉하지 않은 상대입니다. ');
    } else {
      this.logger.verbose('unFollow success');
      return 'unFollow success';
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
