import { Router } from "express";
import { taskController } from "../controllers/taskController";
import {
  taskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} from "./validators/taskValidator";

export const taskRouter = Router();

taskRouter.get("/", taskController.getAll);

taskRouter.post("/", taskValidator, taskController.createTask);

taskRouter.put("/", updateTaskValidator, taskController.updateTask);

taskRouter.delete("/", deleteTaskValidator, taskController.deleteTask);
