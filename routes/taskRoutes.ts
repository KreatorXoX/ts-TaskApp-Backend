import { Router } from "express";
import { TaskController } from "../controllers/taskController";

export const taskRouter = Router();

const controller = new TaskController();

taskRouter.get("/", async (req, res) => {
  const allTasks = await controller.getAll();
  res.json(allTasks);
});

// taskRouter.post(
//   "/",
//   async (req: Request, res: Response) => {
//     res.send("");
//   }
// );
