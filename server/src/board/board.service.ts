import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './repositories/board.repository';
import { Auth } from '../auth/entities/auth.entity';
import { Board } from './entities/board.entity';
import { CreateBoardRequestDto } from './dto/createBoardRequest.dto';
import { EditBoardRequestDto } from './dto/editBoardRequest.dto';
import { BoardCommentRepository } from './repositories/board-comment.repository';
import { CreateBoardCommentRequestDto } from './dto/createBoardCommentRequest.dto';
import { EditBoardCommentRequestDto } from './dto/editBoardCommentRequest.dto';
import { BoardLikeRepository } from './repositories/board-like.repository';
import { BoardListResponseDto } from './dto/boardListResponse.dto';
import { CursorPaginationQueryDto } from '../common/dto/cursor-pagination-query.dto';
import { GetBoardListFilterDto } from './dto/getBoardListFilter.dto';
import { GetBoardRequestDto } from './dto/getBoardRequest.dto';
import { BoardCategory } from './enum/board-category.enum';
import { FileUpload } from 'graphql-upload';
import { BoardCommentReplyRepository } from './repositories/board-comment-reply.repository';
import { EditBoardCommentReplyRequestDto } from './dto/editBoardCommentReplyRequest.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(BoardCommentRepository)
    private boardCommentRepository: BoardCommentRepository,
    @InjectRepository(BoardLikeRepository)
    private boardLikeRepository: BoardLikeRepository,
    @InjectRepository(BoardCommentReplyRepository)
    private boardCommentReplyRepository: BoardCommentReplyRepository,
  ) {}

  uploadFile(filename) {
    return this.boardRepository.uploadFile(filename);
  }

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

  getBoard(getBoardDto: GetBoardRequestDto): Promise<Board> {
    return this.boardRepository.getBoard(getBoardDto);
  }

  createBoard(
    user: Auth,
    createBoardRequestDto: CreateBoardRequestDto,
    fileUpload: FileUpload,
  ) {
    return this.boardRepository.createBoard(
      user,
      createBoardRequestDto,
      fileUpload,
    );
  }

  editBoard(
    boardId: string,
    user: Auth,
    editBoardRequestDto: EditBoardRequestDto,
  ): Promise<string> {
    return this.boardRepository.editBoard(boardId, user, editBoardRequestDto);
  }

  deleteBoard(boardId: string, user: Auth): Promise<string> {
    return this.boardRepository.deleteBoard(boardId, user);
  }

  createBoardComment(
    user: Auth,
    boardId: string,
    createBoardCommentRequestDto: CreateBoardCommentRequestDto,
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
    editBoardCommentRequestDto: EditBoardCommentRequestDto,
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

  createBoardCommentReply(
    user: Auth,
    boardCommentId: string,
    body: string,
  ): Promise<string> {
    return this.boardCommentReplyRepository.createBoardCommentReply(
      user,
      boardCommentId,
      body,
    );
  }

  deleteBoardCommentReply(
    user: Auth,
    boardCommentReplyId: string,
  ): Promise<string> {
    return this.boardCommentReplyRepository.deleteBoardCommentReply(
      user,
      boardCommentReplyId,
    );
  }

  editBoardCommentReply(
    user: Auth,
    boardCommentReplyId: string,
    editBoardCommentReplyRequestDto: EditBoardCommentReplyRequestDto,
  ) {
    return this.boardCommentReplyRepository.editBoardCommentReply(
      user,
      boardCommentReplyId,
      editBoardCommentReplyRequestDto,
    );
  }
}
