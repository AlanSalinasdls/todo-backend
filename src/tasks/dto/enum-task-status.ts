import { registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
