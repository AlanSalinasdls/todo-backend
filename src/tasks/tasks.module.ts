import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/task.entity";
import { TasksService } from "./tasks.service";
import { TasksResolver } from "./tasks.resolver";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksService, TasksResolver],
  exports: [TasksService],
})
export class TasksModule {}
