import { InputType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { TaskStatus } from './enum-task-status';

@InputType()
export class UpdateTaskInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus, { nullable: true })
  status?: TaskStatus;
}
