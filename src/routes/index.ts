import { Router } from "express";
import { branchesRoutes } from "./branches.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/branches", branchesRoutes);

export { routes };
