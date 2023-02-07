import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { ListcategoriesController } from "../modules/Category/ListCategories/ListCategoriesContoller";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListcategoriesController();

categoriesRoutes.post(
  "/create",
  verifyAuthentication,
  createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);

export { categoriesRoutes };
