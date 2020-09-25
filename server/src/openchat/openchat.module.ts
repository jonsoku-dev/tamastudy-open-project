import { Module } from '@nestjs/common';
import { OpenchatService } from './openchat.service';
import { OpenchatResolver } from './openchat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenchatRepository } from './openchat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OpenchatRepository])],
  providers: [OpenchatService, OpenchatResolver],
})
export class OpenchatModule {}
