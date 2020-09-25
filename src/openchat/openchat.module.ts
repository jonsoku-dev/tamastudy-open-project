import { Module } from '@nestjs/common';
import { OpenchatResolver } from './openchat.resolver';
import { OpenchatService } from './openchat.service';

@Module({
  providers: [OpenchatResolver, OpenchatService]
})
export class OpenchatModule {}
