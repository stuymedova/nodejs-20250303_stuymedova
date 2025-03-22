import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import type { TaskQueryDto } from "./dto/taskQuery.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getTasks(@Query() query: TaskQueryDto) {
    return this.tasksService.getFilteredTasks(
      query.status,
      query.page,
      query.limit,
      query.sortBy
    );
  }
}
