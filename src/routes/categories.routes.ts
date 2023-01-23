import { Router } from "express";
import { CreateCategoryController } from "../modules/Category/CreateCategoryController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();

categoriesRoutes.use("/create", createCategoryController.handle);

export { categoriesRoutes };
