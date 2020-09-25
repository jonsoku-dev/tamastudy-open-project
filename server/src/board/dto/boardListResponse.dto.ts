import { Board } from '../entities/board.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class PageInfo {
  @Field(() => Boolean, { nullable: true })
  hasNextPage: boolean;
  @Field(() => String, { nullable: true })
  startCursor: string;
  @Field(() => String, { nullable: true })
  endCursor: string;
}

@ObjectType()
class Edges {
  @Field(() => String)
  cursor: string;
  @Field(() => Board)
  node: Board;
}

@ObjectType()
export class BoardListResponseDto {
  @Field(() => [Edges])
  edges: Edges[];
  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
