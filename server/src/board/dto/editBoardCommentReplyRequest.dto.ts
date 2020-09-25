import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditBoardCommentReplyRequestDto {
  @Field({ nullable: true })
  @IsString()
  body: string;
}
