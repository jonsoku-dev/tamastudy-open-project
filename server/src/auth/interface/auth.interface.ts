import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { Auth } from '../entities/auth.entity';

@InterfaceType()
export class AuthInterface {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => [Auth])
  followers: Promise<Auth[]>;

  @Field(() => [Auth])
  following: Promise<Auth[]>;
}
