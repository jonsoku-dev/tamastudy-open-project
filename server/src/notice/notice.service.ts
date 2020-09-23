import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeRepository } from './notice.repository';
import { Notice } from './entities/notice.entity';
import { CreateNoticeRequestDto } from './dto/createNoticeRequest.dto';
import { Auth } from '../auth/entities/auth.entity';
import { EditNoticeRequestDto } from './dto/editNoticeRequest.dto';
import { GetNoticeListFilterDto } from './dto/getNoticeListFilter.dto';
import { GetNoticeListResponseDto } from './dto/getNoticeListResponse.dto';
import { GetNoticeResponseDto } from './dto/getNoticeResponse.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
  ) {}

  getNoticeList(
    getNoticeListFilterDto: GetNoticeListFilterDto,
  ): Promise<GetNoticeListResponseDto[]> {
    return this.noticeRepository.getNoticeList(getNoticeListFilterDto);
  }

  getNotice(noticeId: string): Promise<GetNoticeResponseDto> {
    return this.noticeRepository.getNotice(noticeId);
  }

  createNotice(
    user: Auth,
    createNoticeRequestDto: CreateNoticeRequestDto,
  ): Promise<string> {
    return this.noticeRepository.createNotice(user, createNoticeRequestDto);
  }

  editNotice(
    user: Auth,
    noticeId: string,
    editNoticeRequestDto: EditNoticeRequestDto,
  ): Promise<string> {
    return this.noticeRepository.editNotice(
      user,
      noticeId,
      editNoticeRequestDto,
    );
  }

  deleteNotice(user: Auth, noticeId: string): Promise<string> {
    return this.noticeRepository.deleteNotice(user, noticeId);
  }
}
