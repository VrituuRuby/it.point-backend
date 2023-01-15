import express from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorHandler } from "./shared/middlewares/ErrorHandler";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(3333, () => console.log("Server running on port 3333!"));

export { app };
