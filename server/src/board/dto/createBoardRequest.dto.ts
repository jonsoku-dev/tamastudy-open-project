import { Field, InputType } from '@nestjs/graphql';
import { BoardCategory } from '../enum/board-category.enum';

@InputType()
export class CreateBoardRequestDto {
  @Field()
  title: string;

  @Field()
  desc: string;

  @Field((type) => BoardCategory)
  category: BoardCategory;
}