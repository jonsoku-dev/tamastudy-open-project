import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { EditBoardRequestDto } from './dto/editBoardRequest.dto';
import { CreateBoardRequestDto } from './dto/createBoardRequest.dto';
import { CreateBoardCommentRequestDto } from './dto/createBoardCommentRequest.dto';
import { EditBoardCommentRequestDto } from './dto/editBoardCommentRequest.dto';
import { CursorPaginationQueryDto } from '../common/dto/cursor-pagination-query.dto';
import { GetBoardListFilterDto } from './dto/getBoardListFilter.dto';
import { GetBoardRequestDto } from './dto/getBoardRequest.dto';
import { BoardCategory } from './enum/board-category.enum';
import { BoardCategoryValidationPipe } from './pipes/board-category-validation.pipe';
import { BoardListResponseDto } from './dto/boardListResponse.dto';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { EditBoardCommentReplyRequestDto } from './dto/editBoardCommentReplyRequest.dto';

@Resolver()
export class BoardResolver {
  constructor(private boardService: BoardService) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, encoding, mimetype }: FileUpload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', (err) => {
          console.log(err);
          return reject(false);
        }),
    );
  }

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
  ) {
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
  getBoard(@Args() getBoardDto: GetBoardRequestDto): Promise<Board> {
    return this.boardService.getBoard(getBoardDto);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createBoard(
    @Args('input') createBoardRequestDto: CreateBoardRequestDto,
    @CurrentUser() user: Auth,
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
    fileUpload: FileUpload,
  ) {
    return this.boardService.createBoard(
      user,
      createBoardRequestDto,
      fileUpload,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editBoard(
    @CurrentUser() user: Auth,
    @Args('boardId') boardId: string,
    @Args('input') editBoardRequestDto: EditBoardRequestDto,
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
    @Args('input') createBoardCommentRequestDto: CreateBoardCommentRequestDto,
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
    @Args('input') editBoardCommentRequestDto: EditBoardCommentRequestDto,
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

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createBoardCommentReply(
    @CurrentUser() user: Auth,
    @Args('boardCommentId') boardCommentId: string,
    @Args('body') body: string,
  ): Promise<string> {
    return this.boardService.createBoardCommentReply(
      user,
      boardCommentId,
      body,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deleteBoardCommentReply(
    @CurrentUser() user: Auth,
    @Args('boardCommentReplyId') boardCommentReplyId: string,
  ): Promise<string> {
    return this.boardService.deleteBoardCommentReply(user, boardCommentReplyId);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editBoardCommentReply(
    @CurrentUser() user: Auth,
    @Args('boardCommentReplyId') boardCommentReplyId: string,
    @Args('input')
    editBoardCommentReplyRequestDto: EditBoardCommentReplyRequestDto,
  ) {
    return this.boardService.editBoardCommentReply(
      user,
      boardCommentReplyId,
      editBoardCommentReplyRequestDto,
    );
  }
}
