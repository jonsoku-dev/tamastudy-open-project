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
import { Auth } from '../../auth/entities/auth.entity';
import { NoticeInterface } from '../interface/notice.interface';

@ObjectType({
  implements: [NoticeInterface],
})
@Entity()
export class Notice extends BaseEntity implements NoticeInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: 0 })
  view: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  userId: string;

  @ManyToOne((type) => Auth, (user) => user.notices, {
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: Auth;
}
