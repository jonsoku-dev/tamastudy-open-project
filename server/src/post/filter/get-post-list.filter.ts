import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class GetPostListFilter {
  @Field({ nullable: true })
  @IsOptional()
  search: string;
}