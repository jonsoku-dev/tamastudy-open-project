import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardCommentRequestDto {
  @Field()
  @IsString()
  body: string;
}