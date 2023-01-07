import { dataSource } from "../config/dbConnection";
import { Task } from "../entities/task";
import { instanceToPlain } from "class-transformer";

export class TaskController {
  constructor(private taskRepository = dataSource.getRepository(Task)) {}

  public async getAll(): Promise<Task[]> {
    let allTasks: Task[] = [];

    try {
      allTasks = await this.taskRepository.find({ order: { date: "ASC" } });

      allTasks = instanceToPlain(allTasks) as Task[];
    } catch (error) {
      console.log(error);
    }

    return allTasks;
  }
  public async createTask(): Promise<string> {
    return "";
  }
}
