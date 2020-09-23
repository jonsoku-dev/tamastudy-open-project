import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Column } from 'typeorm/index';
import { NewsFlagEnum } from '../enum/news-flag.enum';

@InterfaceType()
export abstract class NewsInterface {
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

  @Field(() => Date, { nullable: true })
  createAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => NewsFlagEnum, { nullable: true })
  flag: NewsFlagEnum;
}
