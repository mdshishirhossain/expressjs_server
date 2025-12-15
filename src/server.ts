import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;

//initializing db
initDB();

//middleware
//parser
//for json body data
app.use(express.json());
//for form data
app.use(express.urlencoded());

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Bismillah!");
});

//users CRUD
app.use("/users", userRoutes);

//todos CRUD
app.use("/todos", todoRoutes);

//404 not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
