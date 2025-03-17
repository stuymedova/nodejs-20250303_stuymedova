import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'tasks/task.model';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
