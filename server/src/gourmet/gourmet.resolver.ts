import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { GetGourmetListResponseDto } from './dto/getGourmetListResponse.dto';
import { GourmetService } from './gourmet.service';
import { Gourmet } from './entities/gourmet.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateGourmetRequestDto } from './dto/createGourmetRequest.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/get-user.decorator';
import { GetGourmetResponseDto } from './dto/getGourmetResponse.dto';
import { ParseStringPipe } from '../common/pipes/parse-string.pipe';
import { EditGourmetRequestDto } from './dto/editGourmetRequest.dto';
import { GourmetComment } from './entities/gourmetComment.entity';
import { CreateGourmetCommentRequestDto } from './dto/createGourmetCommentRequest.dto';
import { GetGourmetListFilterDto } from './dto/getGourmetListFilter.dto';
import { EditGourmetCommentRequestDto } from './dto/editGourmetCommentRequest.dto';

@Resolver()
export class GourmetResolver {
  constructor(private readonly gourmetService: GourmetService) {}

  @Query(() => [GetGourmetListResponseDto])
  getGourmetList(
    @Args() getGourmetListFilterDto: GetGourmetListFilterDto,
  ): Promise<GetGourmetListResponseDto[]> {
    console.log(getGourmetListFilterDto);
    return this.gourmetService.getGourmetList(getGourmetListFilterDto);
  }

  @Query(() => GetGourmetResponseDto)
  getGourmet(
    @Args('gourmetId', ParseStringPipe) gourmetId: string,
  ): Promise<GetGourmetResponseDto> {
    return this.gourmetService.getGourmet(gourmetId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Gourmet)
  createGourmet(
    @CurrentUser() user: Auth,
    @Args('input') createGourmetRequestDto: CreateGourmetRequestDto,
  ): Promise<Gourmet> {
    return this.gourmetService.createGourmet(user, createGourmetRequestDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  editGourmet(
    @CurrentUser() user: Auth,
    @Args('gourmetId') gourmetId: string,
    @Args('input') editGourmetRequestDto: EditGourmetRequestDto,
  ): Promise<string> {
    return this.gourmetService.editGourmet(
      user,
      gourmetId,
      editGourmetRequestDto,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  deleteGourmet(
    @CurrentUser() user: Auth,
    @Args('gourmetId') gourmetId: string,
  ): Promise<string> {
    return this.gourmetService.deleteGourmet(user, gourmetId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GourmetComment)
  createGourmetComment(
    @CurrentUser() user: Auth,
    @Args('gourmetId') gourmetId: string,
    @Args('input')
    createGourmetCommentRequestDto: CreateGourmetCommentRequestDto,
  ): Promise<GourmetComment> {
    return this.gourmetService.createGourmetComment(
      user,
      gourmetId,
      createGourmetCommentRequestDto,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  editGourmetComment(
    @CurrentUser() user: Auth,
    @Args('gourmetCommentId') gourmetCommentId: string,
    @Args('input')
    editGourmetCommentRequestDto: EditGourmetCommentRequestDto,
  ) {
    return this.gourmetService.editGourmetComment(
      user,
      gourmetCommentId,
      editGourmetCommentRequestDto,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  deleteGourmetComment(
    @CurrentUser() user: Auth,
    @Args('gourmetCommentId') gourmetCommentId: string,
  ) {
    return this.gourmetService.deleteGourmetComment(user, gourmetCommentId);
  }
}
