import { IsEmail, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginRequest {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}