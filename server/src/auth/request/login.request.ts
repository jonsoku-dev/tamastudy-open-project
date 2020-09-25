import { IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginRequest {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}