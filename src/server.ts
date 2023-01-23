import express from "express";
import { routes } from "./routes";

import "express-async-errors";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(3333, () => console.log("Server running on port 3333!"));

export { app };
