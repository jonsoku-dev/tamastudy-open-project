import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Post } from '../../post/post.entity';
import { Notice } from '../../notice/entities/notice.entity';
import { toSvg } from 'jdenticon';
import { Board } from '../../board/entities/board.entity';
import { BoardComment } from '../../board/entities/board-comment.entity';
import { PostComment } from '../../post/post-comment.entity';
import { BoardLike } from '../../board/entities/board-like.entity';
import { AuthInterface } from '../interface/auth.interface';

@ObjectType({
  implements: [AuthInterface],
})
@Entity()
export class Auth extends BaseEntity implements AuthInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column('longtext')
  avatar: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => PostComment, (comment) => comment.user)
  postComments: PostComment[];

  @OneToMany(() => Notice, (notice) => notice.user)
  notices: Notice[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => BoardComment, (boardComments) => boardComments.user)
  boardComments: Board[];

  @OneToMany(() => BoardLike, (boardLikes) => boardLikes.user)
  boardLikes: BoardLike[];

  @ManyToMany(() => Auth, (user) => user.following)
  @JoinTable({
    name: 'auth_followers',
    joinColumn: {
      name: 'followingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followerId',
      referencedColumnName: 'id',
    },
  })
  followers: Promise<Auth[]>;

  @ManyToMany(() => Auth, (user) => user.followers)
  following: Promise<Auth[]>;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  generateJdenticon() {
    this.avatar = toSvg(this.email, 100);
  }
}
