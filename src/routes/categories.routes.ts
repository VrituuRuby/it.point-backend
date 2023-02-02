import { Router } from "express";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();

categoriesRoutes.use("/create", createCategoryController.handle);

export { categoriesRoutes };
