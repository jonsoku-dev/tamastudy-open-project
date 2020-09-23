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
import { BoardCategory } from '../enum/board-category.enum';
import { BoardComment } from './board-comment.entity';
import { BoardLike } from './board-like.entity';
import { BoardInterface } from '../interface/board.interface';
import { IsString } from 'class-validator';

@ObjectType({
  implements: [BoardInterface],
})
@Entity()
export class Board extends BaseEntity implements BoardInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: 0 })
  view: number;

  @Column()
  category: BoardCategory;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => Auth, (user) => user.boards, {
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @OneToMany(() => BoardComment, (comment) => comment.board)
  comments: BoardComment[];

  @OneToMany(() => BoardLike, (like) => like.board)
  likes: BoardLike[];
}
