import { DataSource } from "typeorm";
import { Task } from "../entities/task";

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task],
  synchronize: true,
});

export const initializeDB = async () => {
  try {
    await dataSource.initialize();
    console.log("connection succesful");
  } catch (error) {
    console.log("error in db connection");
  }
};
