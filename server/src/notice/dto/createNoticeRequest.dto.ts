import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateNoticeRequestDto {
  @Field()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  desc: string;
}
