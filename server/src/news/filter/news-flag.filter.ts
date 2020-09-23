import { Field, InputType } from '@nestjs/graphql';
import { NewsFlagEnum } from '../enum/news-flag.enum';

@InputType()
export class NewsFlagFilter {
  @Field((type) => NewsFlagEnum, { nullable: true })
  flag: NewsFlagEnum;
}
