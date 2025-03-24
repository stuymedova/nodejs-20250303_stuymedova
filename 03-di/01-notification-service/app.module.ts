import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [TasksModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
