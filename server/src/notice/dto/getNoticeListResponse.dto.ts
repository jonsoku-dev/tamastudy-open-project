import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetNoticeListResponseDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  createdAt: Date;
}