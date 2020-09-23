import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { IsString } from 'class-validator';
import { Auth } from '../auth/entities/auth.entity';
import { Post } from './post.entity';

@ObjectType()
@Entity()
export class PostComment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  postId: string;

  @Field(() => String)
  @Column()
  @IsString()
  body: string;

  @Field(() => Auth)
  @ManyToOne(() => Auth, user => user.postComments, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<Auth>;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.comments, { nullable: true })
  @JoinColumn({ name: 'postId' })
  post: Promise<Post>;
}