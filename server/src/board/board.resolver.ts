import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { editBoardRequestDto } from './dto/edit-board-request.dto';
import { createBoardRequestDto } from './dto/create-board-request.dto';
import { createBoardCommentRequestDto } from './dto/create-board-comment-request.dto';
import { editBoardCommentRequestDto } from './dto/edit-board-comment-request.dto';
import { BoardListResponseDto } from './dto/board-list-response.dto';
import { CursorPaginationQueryDto } from '../common/dto/cursor-pagination-query.dto';
import { GetBoardListFilterDto } from './dto/get-board-list-filter.dto';
import { GetBoardDto } from './dto/get-board.dto';
import { BoardCategory } from './enum/board-category.enum';
import { BoardCategoryValidationPipe } from './pipes/board-category-validation.pipe';

@Resolver()
export class BoardResolver {
  constructor(private boardService: BoardService) {}

  @Query(() => [Board])
  getBoardListByCategory(
    @Args(
      'category',
      {
        name: 'category',
        type: () => BoardCategory,
      },
      BoardCategoryValidationPipe,
    )
    category: BoardCategory,
  ): Promise<Board[]> {
    return this.boardService.getBoardListByCategory(category);
  }

  @Query(() => BoardListResponseDto)
  getBoardList(
    @Args() getBoardListFilterDto: GetBoardListFilterDto,
    @Args() cursorPaginationQueryDto: CursorPaginationQueryDto,
  ): Promise<BoardListResponseDto> {
    return this.boardService.getBoardList(
      getBoardListFilterDto,
      cursorPaginationQueryDto,
    );
  }

  @Query(() => Board)
  getBoard(@Args() getBoardDto: GetBoardDto): Promise<Board> {
    return this.boardService.getBoard(getBoardDto);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createBoard(
    @Args('input') createBoardRequestDto: createBoardRequestDto,
    @CurrentUser() user: Auth,
  ) {
    return this.boardService.createBoard(user, createBoardRequestDto);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editBoard(
    @CurrentUser() user: Auth,
    @Args('boardId') boardId: string,
    @Args('input') editBoardRequestDto: editBoardRequestDto,
  ): Promise<string> {
    return this.boardService.editBoard(boardId, user, editBoardRequestDto);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deleteBoard(
    @Args('boardId') boardId: string,
    @CurrentUser() user: Auth,
  ): Promise<string> {
    return this.boardService.deleteBoard(boardId, user);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createBoardComment(
    @CurrentUser() user: Auth,
    @Args('boardId') boardId: string,
    @Args('input') createBoardCommentRequestDto: createBoardCommentRequestDto,
  ) {
    return this.boardService.createBoardComment(
      user,
      boardId,
      createBoardCommentRequestDto,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editBoardComment(
    @CurrentUser() user: Auth,
    @Args('boardCommentId') boardCommentId: string,
    @Args('input') editBoardCommentRequestDto: editBoardCommentRequestDto,
  ) {
    return this.boardService.editBoardComment(
      user,
      boardCommentId,
      editBoardCommentRequestDto,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deleteBoardComment(
    @CurrentUser() user: Auth,
    @Args('boardCommentId') boardCommentId: string,
  ) {
    return this.boardService.deleteBoardComment(user, boardCommentId);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  like(@CurrentUser() user: Auth, @Args('boardId') boardId: string) {
    return this.boardService.like(user.id, boardId);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  unLike(@CurrentUser() user: Auth, @Args('boardId') boardId: string) {
    return this.boardService.unLike(user.id, boardId);
  }
}
