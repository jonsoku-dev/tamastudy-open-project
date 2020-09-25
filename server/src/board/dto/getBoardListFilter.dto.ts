import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { BoardCategory } from '../enum/board-category.enum';

@ArgsType()
export class GetBoardListFilterDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search: string;

  @Field(() => BoardCategory, { nullable: true })
  @IsOptional()
  category: BoardCategory;
}