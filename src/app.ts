import express from "express";
import cors from "cors"
import "express-async-errors";

import { routes } from "./routes";
import errorHandler from "./middleware/ErrorHandler";
const app = express();

app.use(cors())

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export { app };
