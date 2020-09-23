import { registerEnumType } from '@nestjs/graphql';

export enum BoardCategory {
  ALL = 'ALL',
  TRADE = 'TRADE',
  JOB = 'JOB',
  FREE = 'FREE',
  FQ = 'FQ',
}

registerEnumType(BoardCategory, {
  name: 'BoardCategory', // this one is mandatory
});
