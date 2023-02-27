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
const createSubcategoryControler = new CreateSubcategoryController();

categoriesRoutes.post(
  "/create",
  verifyAuthentication,
  createCategoryController.handle
);
categoriesRoutes.post("/:id/create", createSubcategoryControler.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.patch("/update", updateCategoryController.handle);
categoriesRoutes.delete("/delete/:id", deleteCategoryController.handle);

export { categoriesRoutes };
