import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './repositories/board.repository';
import { Auth } from '../auth/entities/auth.entity';
import { Board } from './entities/board.entity';
import { createBoardRequestDto } from './dto/create-board-request.dto';
import { editBoardRequestDto } from './dto/edit-board-request.dto';
import { BoardCommentRepository } from './repositories/board-comment.repository';
import { createBoardCommentRequestDto } from './dto/create-board-comment-request.dto';
import { editBoardCommentRequestDto } from './dto/edit-board-comment-request.dto';
import { BoardLikeRepository } from './repositories/board-like.repository';
import { BoardListResponseDto } from './dto/board-list-response.dto';
import { CursorPaginationQueryDto } from '../common/dto/cursor-pagination-query.dto';
import { GetBoardListFilterDto } from './dto/get-board-list-filter.dto';
import { GetBoardDto } from './dto/get-board.dto';
import { BoardCategory } from './enum/board-category.enum';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(BoardCommentRepository)
    private boardCommentRepository: BoardCommentRepository,
    @InjectRepository(BoardLikeRepository)
    private boardLikeRepository: BoardLikeRepository,
  ) {}

  getBoardList(
    getBoardListFilterDto: GetBoardListFilterDto,
    cursorPaginationQueryDto: CursorPaginationQueryDto,
  ): Promise<BoardListResponseDto> {
    return this.boardRepository.getBoardList(
      getBoardListFilterDto,
      cursorPaginationQueryDto,
    );
  }

  getBoardListByCategory(category: BoardCategory) {
    return this.boardRepository.getBoardListByCategory(category);
  }

  getBoard(getBoardDto: GetBoardDto): Promise<Board> {
    return this.boardRepository.getBoard(getBoardDto);
  }

  createBoard(user: Auth, createBoardRequestDto: createBoardRequestDto) {
    return this.boardRepository.createBoard(user, createBoardRequestDto);
  }

  editBoard(
    boardId: string,
    user: Auth,
    editBoardRequestDto: editBoardRequestDto,
  ): Promise<string> {
    return this.boardRepository.editBoard(boardId, user, editBoardRequestDto);
  }

  deleteBoard(boardId: string, user: Auth): Promise<string> {
    return this.boardRepository.deleteBoard(boardId, user);
  }

  createBoardComment(
    user: Auth,
    boardId: string,
    createBoardCommentRequestDto: createBoardCommentRequestDto,
  ) {
    return this.boardCommentRepository.createBoardComment(
      user,
      boardId,
      createBoardCommentRequestDto,
    );
  }

  editBoardComment(
    user: Auth,
    boardCommentId: string,
    editBoardCommentRequestDto: editBoardCommentRequestDto,
  ) {
    return this.boardCommentRepository.editBoardComment(
      user,
      boardCommentId,
      editBoardCommentRequestDto,
    );
  }

  deleteBoardComment(user: Auth, boardCommentId: string) {
    return this.boardCommentRepository.deleteBoardComment(user, boardCommentId);
  }

  like(userId: string, boardId: string) {
    return this.boardLikeRepository.like(userId, boardId);
  }

  unLike(userId: string, boardId: string) {
    return this.boardLikeRepository.unLike(userId, boardId);
  }
}
