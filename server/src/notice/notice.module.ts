import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeRepository } from './notice.repository';
import { NoticeResolver } from './notice.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoticeRepository]),
  ],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {
}
