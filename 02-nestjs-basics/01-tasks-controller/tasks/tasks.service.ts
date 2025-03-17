import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(task: Task): Task {
    if (!('id' in task)) {
      task.id = crypto.randomUUID();
    }
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: Task): Task {
    const i = this.tasks.findIndex((task) => task.id === id);
    if (i === -1) {
      throw new NotFoundException();
    }
    this.tasks[i] = Object.assign(this.tasks[i], update);
    return this.tasks[i];
  }

  deleteTask(id: string): Task {
    const i = this.tasks.findIndex((task) => task.id === id);
    if (i === -1) {
      throw new NotFoundException();
    }
    const deleted = this.tasks[i];
    this.tasks.splice(i, 1);
    return deleted;
  }
}
