import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlaceholderResponse {
  @Field(() => Number, { nullable: true })
  userId: number;
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  title: string;
  @Field(() => Boolean, { nullable: true })
  completed: boolean;
}
