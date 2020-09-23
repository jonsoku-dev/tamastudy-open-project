import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePostCommentRequest {
  @Field()
  @IsString()
  body: string;
}