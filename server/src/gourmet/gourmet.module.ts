import { Module } from '@nestjs/common';
import { GourmetResolver } from './gourmet.resolver';
import { GourmetService } from './gourmet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GourmetRepository } from './repositories/gourmet.repository';
import { GourmetCommentRepository } from './repositories/gourmetComment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GourmetRepository, GourmetCommentRepository]),
  ],
  providers: [GourmetResolver, GourmetService],
})
export class GourmetModule {}
