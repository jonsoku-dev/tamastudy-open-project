import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@ArgsType()
export class GetBoardRequestDto {
  @Field()
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  boardId: string;

  @Field({ nullable: false, defaultValue: false })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isRefetch: boolean;
}
