import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { CreateNoticeRequestDto } from './dto/createNoticeRequest.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { EditNoticeRequestDto } from './dto/editNoticeRequest.dto';
import { GetNoticeListFilterDto } from './dto/getNoticeListFilter.dto';
import { GetNoticeListResponseDto } from './dto/getNoticeListResponse.dto';
import { GetNoticeResponseDto } from './dto/getNoticeResponse.dto';

@Resolver()
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => [GetNoticeListResponseDto])
  getNoticeList(@Args() getNoticeListFilterDto: GetNoticeListFilterDto) {
    return this.noticeService.getNoticeList(getNoticeListFilterDto);
  }

  @Query(() => GetNoticeResponseDto)
  getNotice(@Args('noticeId') noticeId: string): Promise<GetNoticeResponseDto> {
    return this.noticeService.getNotice(noticeId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  createNotice(
    @CurrentUser() user: Auth,
    @Args('input') createNoticeRequestDto: CreateNoticeRequestDto,
  ): Promise<string> {
    return this.noticeService.createNotice(user, createNoticeRequestDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  editNotice(
    @CurrentUser() user: Auth,
    @Args('noticeId') noticeId: string,
    @Args('input') editNoticeRequestDto: EditNoticeRequestDto,
  ): Promise<string> {
    return this.noticeService.editNotice(user, noticeId, editNoticeRequestDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  deleteNotice(
    @CurrentUser() user: Auth,
    @Args('noticeId') noticeId: string,
  ): Promise<string> {
    return this.noticeService.deleteNotice(user, noticeId);
  }
}