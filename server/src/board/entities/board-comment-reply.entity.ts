import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import { Auth } from '../../auth/entities/auth.entity';
import { BoardComment } from './board-comment.entity';
import { BoardCommentReplyInterface } from '../interface/board-comment-reply.interface';

@ObjectType({
  implements: [BoardCommentReplyInterface],
})
@Entity()
export class BoardCommentReply
  extends BaseEntity
  implements BoardCommentReplyInterface {
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

  @ManyToOne(() => Auth, (user) => user.boardCommentReplies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column()
  boardCommentId: string;

  @ManyToOne(
    () => BoardComment,
    (boardComment) => boardComment.boardCommentReplies,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'boardCommentId' })
  boardComment: BoardComment;
}
