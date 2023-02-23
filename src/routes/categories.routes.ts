import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { ListcategoriesController } from "../modules/Category/ListCategories/ListCategoriesContoller";
import { UpdateCategoryController } from "../modules/Category/UpdateCategory/UpdateCategoryController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListcategoriesController();
const updateCategoryController = new UpdateCategoryController();

categoriesRoutes.post(
  "/create",
  verifyAuthentication,
  createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.patch("/update", updateCategoryController.handle);

export { categoriesRoutes };
