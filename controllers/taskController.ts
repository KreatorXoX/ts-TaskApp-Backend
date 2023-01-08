import { dataSource } from "../config/dbConnection";
import { Task } from "../entities/task";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DeleteResult, UpdateResult } from "typeorm";

class TaskController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[] = [];

    try {
      allTasks = await dataSource
        .getRepository(Task)
        .find({ order: { date: "ASC" } });

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (error) {
      return res.json({ error: "Error during fetching All Tasks" }).status(500);
    }
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() }).status(400);
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.date = req.body.date;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await dataSource.getRepository(Task).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;
    } catch (error) {
      return res.json({ message: "Error during creating Task" }).status(500);
    }

    return res.json({ message: "Successful", task: createdTask }).status(200);
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() }).status(400);
    }

    // find the task if it exists

    let task: Task | null;

    try {
      task = await dataSource.getRepository(Task).findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      return res.json({ message: "Error during updating Task" }).status(500);
    }

    // return 400 if null
    if (!task) {
      return res.json({ message: "Task is not Found" }).status(404);
    }

    // declare a variable for updatedTask
    let updatedTask: UpdateResult;

    // update task
    try {
      updatedTask = await dataSource
        .getRepository(Task)
        .update(
          req.body.id,
          plainToInstance(Task, { status: req.body.status })
        );

      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ message: "Error during updating Task" }).status(500);
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() }).status(400);
    }

    // find the task if it exists
    let taskToDelete: Task | null;

    try {
      taskToDelete = await dataSource.getRepository(Task).findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      return res.json({ message: "Error during deleting Task" }).status(500);
    }

    // return 404 if null
    if (!taskToDelete) {
      return res.json({ message: "Task is not Found" }).status(404);
    }

    // declare a variable for deletedTask
    let deletedTask: DeleteResult;

    // update task
    try {
      deletedTask = await dataSource.getRepository(Task).delete(req.body.id);
      deletedTask = instanceToPlain(deletedTask) as DeleteResult;

      return res.json(deletedTask).status(200);
    } catch (error) {
      return res.json({ message: "Error during deleting Task" }).status(500);
    }
  }
}

export const taskController = new TaskController();
