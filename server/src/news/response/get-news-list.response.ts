import { Field, ID, ObjectType } from '@nestjs/graphql';
import { NewsFlagEnum } from '../enum/news-flag.enum';

@ObjectType()
export class GetNewsListResponse {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  press: string;

  @Field(() => Date, { nullable: true })
  data: Date;

  @Field(() => String, { nullable: true })
  url: string;

  @Field(() => String, { nullable: true })
  portal: string;

  @Field(() => NewsFlagEnum)
  flag: NewsFlagEnum;
}
