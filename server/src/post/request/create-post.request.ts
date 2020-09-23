import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostRequest {
  @Field()
  @IsString()
  content: string;
}