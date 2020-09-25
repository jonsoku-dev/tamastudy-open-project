import { Notice } from './entities/notice.entity';
import { EntityRepository, Repository } from 'typeorm/index';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNoticeRequestDto } from './dto/createNoticeRequest.dto';
import { Auth } from '../auth/entities/auth.entity';
import { EditNoticeRequestDto } from './dto/editNoticeRequest.dto';
import { GetNoticeListFilterDto } from './dto/getNoticeListFilter.dto';
import { GetNoticeListResponseDto } from './dto/getNoticeListResponse.dto';
import { GetNoticeResponseDto } from './dto/getNoticeResponse.dto';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  private logger = new Logger('NoticeRepository');

  async getNoticeList(
    getNoticeListFilterDto: GetNoticeListFilterDto,
  ): Promise<GetNoticeListResponseDto[]> {
    try {
      const query = this.createQueryBuilder('notice')
        .leftJoinAndSelect('notice.user', 'user')
      if (getNoticeListFilterDto) {
        const { search, limit, offset } = getNoticeListFilterDto;
        if (search) {
          query.andWhere('notice.title LIKE :search', {
            search: `%${search}%`,
          });
        }
        if (limit) {
          query.take(limit);
        }
        if (offset) {
          query.skip(offset);
        }
      }
      const result = await query.getMany();
      this.logger.verbose('getNoticeList success');
      return result;
    } catch (e) {
      console.error(e);
      this.logger.error('getNoticeList Error');
      throw new InternalServerErrorException('getNoticeList Error');
    }
  }

  async getNotice(noticeId: string): Promise<GetNoticeResponseDto> {
    const query = this.createQueryBuilder('notice');
    const found = await query
      .cache(true)
      .leftJoinAndSelect('notice.user', 'user')
      .where('notice.id = :noticeId', { noticeId })
      .getOne();
    if (!found) {
      this.logger.error('getNotice Error');
      throw new NotFoundException('getNotice Error');
    }
    await this.increment({ id: found.id }, 'view', 1);
    this.logger.verbose('getNotice success');
    return found;
  }

  async getAuthorNotice(user: Auth, noticeId: string): Promise<Notice> {
    const query = this.createQueryBuilder('notice');
    const found = await query
      .leftJoinAndSelect('notice.user', 'user')
      .where('notice.id = :noticeId', { noticeId })
      .cache(true)
      .getOne();
    if (!found) {
      this.logger.error('getAuthorNotice Error');
      throw new NotFoundException('getAuthorNotice Error');
    }
    if (found.userId !== user.id) {
      this.logger.error('getAuthorNotice Error');
      throw new UnauthorizedException('getAuthorNotice Error');
    }
    this.logger.verbose('getAuthorNotice success');
    return found;
  }

  async createNotice(
    user: Auth,
    createNoticeRequestDto: CreateNoticeRequestDto,
  ): Promise<string> {
    try {
      const query = this.createQueryBuilder('notice');
      await query
        .insert()
        .into(Notice)
        .values({
          ...createNoticeRequestDto,
          userId: user.id,
        })
        .execute();
      this.logger.verbose('createNotice success');
      return 'success';
    } catch (e) {
      console.error(e);
      this.logger.error('createNotice error');
      throw new NotFoundException('createNotice error');
    }
  }

  async editNotice(
    user: Auth,
    noticeId: string,
    editNoticeRequestDto: EditNoticeRequestDto,
  ): Promise<string> {
    const found = await this.getAuthorNotice(user, noticeId);
    const query = this.createQueryBuilder('notice');
    const result = await query
      .where('notice.id = :noticeId', { noticeId: found.id })
      .update(Notice)
      .set({
        ...editNoticeRequestDto,
      })
      .execute();
    if (result.affected === 0) {
      this.logger.error('editNotice error');
      throw new InternalServerErrorException('editNotice error');
    } else {
      this.logger.verbose('editNotice success');
      return 'success';
    }
  }

  async deleteNotice(user: Auth, noticeId: string): Promise<string> {
    const found = await this.getAuthorNotice(user, noticeId);
    const query = this.createQueryBuilder('notice');
    try {
      await query
        .where('notice.id = :noticeId', { noticeId: found.id })
        .delete()
        .from(Notice)
        .execute();
      this.logger.verbose('deleteNotice success');
      return 'success';
    } catch (e) {
      console.error(e);
      this.logger.error('deleteNotice error');
      throw new NotFoundException('deleteNotice error');
    }
  }
}
