import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm/index';
import { Auth } from '../../auth/entities/auth.entity';
import { Board } from './board.entity';

@ObjectType()
@Entity()
export class BoardLike extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @ManyToOne(() => Auth, (user) => user.boardLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column()
  boardId: string;

  @ManyToOne(() => Board, (board) => board.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;
}
