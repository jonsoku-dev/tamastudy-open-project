import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createBoardCommentRequestDto {
  @Field()
  @IsString()
  body: string;
}