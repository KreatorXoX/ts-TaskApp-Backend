import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("We are in the req111");
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
