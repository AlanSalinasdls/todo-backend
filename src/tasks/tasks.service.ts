import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    const result = await this.tasksRepository.find({
      where: { user: { id: userId } },
      order: {
        createdAt: 'DESC',
      },
    });
    return result;
  }

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const user = await this.usersService.findOneById(createTaskInput.userId);
    const task = this.tasksRepository.create({
      ...createTaskInput,
      status: (createTaskInput.status || 'pending').toLowerCase(),
      user: user,
      createdAt: new Date(),
    });
    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.tasksRepository.save({
      ...task,
      ...updateTaskInput,
      updatedAt: new Date(),
      ...(updateTaskInput.status && {
        status: updateTaskInput.status.toLowerCase(),
      }),
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
