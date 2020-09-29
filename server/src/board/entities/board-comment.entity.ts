import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { Board } from './board.entity';
import { BoardCommentInterface } from '../interface/board-comment.interface';
import { BoardCommentReply } from './board-comment-reply.entity';

@ObjectType({
  implements: [BoardCommentInterface],
})
@Entity()
export class BoardComment extends BaseEntity implements BoardCommentInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;
  @ManyToOne(() => Auth, (user) => user.boardComments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column()
  boardId: string;
  @ManyToOne(() => Board, (board) => board.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @OneToMany(
    () => BoardCommentReply,
    (boardCommentReply) => boardCommentReply.boardComment,
  )
  boardCommentReplies: BoardCommentReply[];
}
