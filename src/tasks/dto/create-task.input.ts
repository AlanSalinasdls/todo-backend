import { InputType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { TaskStatus } from './enum-task-status';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field()
  userId: string;
}
