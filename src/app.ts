import express from "express";
import "express-async-errors";
import cors from "cors";
import fs from "fs";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerYamlFile = fs.readFileSync(YAML.parse("src/swagger.yml"), "utf-8");
const swaggerFile = YAML.parse(swaggerYamlFile);
console.log(swaggerFile);

import { routes } from "./routes";
import errorHandler from "./middleware/errorHandler";
const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      supportedSubmitMethods: ["get"],
    },
  })
);

app.use("/api", routes);

app.use(errorHandler);

export { app };
