import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import { initializeDB } from "./config/dbConnection";
import bodyParser from "body-parser";
import cors from "cors";
import { taskRouter } from "./routes/taskRoutes";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

const port = process.env.PORT || 5500;

initializeDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port : ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
