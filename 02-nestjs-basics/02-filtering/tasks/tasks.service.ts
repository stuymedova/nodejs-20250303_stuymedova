import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    if (page !== undefined && limit === undefined || page === undefined && limit !== undefined) {
      throw new BadRequestException();
    }
    let tasks = this.tasks;
    if (status !== undefined) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (page !== undefined && limit !== undefined) {
      const start = (page - 1) * limit;
      tasks = tasks.slice(start, start + limit);
    }
    return tasks;
  }
}
