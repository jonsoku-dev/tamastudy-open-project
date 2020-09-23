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
import { IsNotEmpty, IsString } from 'class-validator';
import { Auth } from '../auth/entities/auth.entity';
import { PostComment } from './post-comment.entity';
import { PostInterface } from './interface/post.interface';

@ObjectType({
  implements: [PostInterface],
})
@Entity()
export class Post extends BaseEntity implements PostInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @IsString({ message: '포스트 내용은 String 형식으로 입력해주세요. ' })
  @IsNotEmpty({ message: '포스트 내용을 입력해주세요. ' })
  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @Column()
  userId: string;

  @ManyToOne((type) => Auth, (user) => user.posts, {
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Promise<Auth>;

  @OneToMany(() => PostComment, (comment) => comment.post)
  comments: Promise<PostComment[]>;
}
