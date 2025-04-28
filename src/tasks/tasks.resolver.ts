import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  @UseGuards(GqlAuthGuard)
  async tasksByUserId(@Args('userId') userId: string): Promise<Task[]> {
    return this.tasksService.findAllByUserId(userId);
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  async createTask(@Args('data') data: CreateTaskInput): Promise<Task> {
    return this.tasksService.create(data);
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  async updateTask(
    @Args('taskId') taskId: string,
    @Args('data') data: UpdateTaskInput,
  ): Promise<Task> {
    return this.tasksService.update(taskId, data);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteTask(@Args('taskId') taskId: string): Promise<boolean> {
    await this.tasksService.delete(taskId);
    return true;
  }
}
