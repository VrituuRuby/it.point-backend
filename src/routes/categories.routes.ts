import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/Category/DeleteCategory/DeleteCategoryController";
import { CreateSubcategoryController } from "../modules/Category/DeleteSubcategory/CreateSubcategoryController";
import { ListcategoriesController } from "../modules/Category/ListCategories/ListCategoriesContoller";
import { UpdateCategoryController } from "../modules/Category/UpdateCategory/UpdateCategoryController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListcategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const createSubcategoryController = new CreateSubcategoryController();

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
  "/create",
  verifyAuthentication,
  createCategoryController.handle
);
categoriesRoutes.patch("/update", updateCategoryController.handle);
categoriesRoutes.delete("/delete/:id", deleteCategoryController.handle);
categoriesRoutes.post("/:id/create", createSubcategoryController.handle);

export { categoriesRoutes };
