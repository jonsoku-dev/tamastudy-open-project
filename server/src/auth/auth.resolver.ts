import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterRequest } from './request/register.request';
import { Auth } from './entities/auth.entity';
import { CurrentUser } from './decorator/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/graphql-auth.guard';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  register(@Args('input') registerRequest: RegisterRequest): Promise<Auth> {
    return this.authService.register(registerRequest);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') loginRequest: LoginRequest,
    @Context() context: any,
  ) {
    const token = await this.authService.login(loginRequest);
    context.res.cookie('token', token);
    return { token };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Auth, { name: 'currentUser' })
  private async currentUser(@CurrentUser() user: Auth): Promise<Auth> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Auth)
  follow(
    @CurrentUser() user: Auth,
    @Args('targetUserId') targetUserId: string,
  ) {
    const result = this.authService.follow(targetUserId, user.id);
    pubSub.publish('followSubscription', { followSubscription: result });
    return result;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  unFollow(
    @CurrentUser() user: Auth,
    @Args('targetUserId') targetUserId: string,
  ) {
    return this.authService.unFollow(targetUserId, user.id);
  }

  @Subscription((returns) => Auth)
  followSubscription() {
    return pubSub.asyncIterator('followSubscription');
  }
}
