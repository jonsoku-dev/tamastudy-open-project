import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { ObjectType } from '@nestjs/graphql';
import { GourmetCommentInterface } from '../interface/gourmetComment.interface';
import { Auth } from '../../auth/entities/auth.entity';
import { Gourmet } from './gourmet.entity';

@ObjectType({
  implements: [GourmetCommentInterface],
})
@Entity()
export class GourmetComment
  extends BaseEntity
  implements GourmetCommentInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  images: string;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;
  @ManyToOne(() => Auth, (user) => user.gourmetComments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column()
  gourmetId: string;
  @ManyToOne(() => Gourmet, (gourmet) => gourmet.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gourmetId' })
  gourmet: Gourmet;
}
