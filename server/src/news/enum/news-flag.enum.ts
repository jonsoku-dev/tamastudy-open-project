import { registerEnumType } from '@nestjs/graphql';

export enum NewsFlagEnum {
  KR = 'KR',
  JP = 'JP',
  US = 'US',
}

registerEnumType(NewsFlagEnum, {
  name: 'NewsFlagEnum', // this one is mandatory
});
