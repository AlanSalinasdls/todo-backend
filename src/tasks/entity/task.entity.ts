import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@ObjectType()
@Entity()
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  user: User;


}
