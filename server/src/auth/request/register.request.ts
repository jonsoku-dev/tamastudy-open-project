
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterRequest {
  @Field()
  @IsString()
  @MinLength(2, { message: '유저명은 2자 이상 입력해주세요. ' })
  @MaxLength(10, { message: '유저명은 10자 이내로 입력해주세요. ' })
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(2, { message: '패스워드는 2자 이상 입력해주세요. ' })
  password: string;
}