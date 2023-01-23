import { AppError } from "./config/AppError";
import express from "express";
import "express-async-errors";

import { routes } from "./routes";
import errorHandler from "./middleware/ErrorHandler";
const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export { app };
