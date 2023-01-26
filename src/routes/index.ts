import { Router } from "express";
import { branchesRoutes } from "./branches.routes";
import { categoriesRoutes } from "./categories.routes";
import { ticketsRoutes } from "./tickets.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/branches", branchesRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/tickets", ticketsRoutes);

export { routes };
