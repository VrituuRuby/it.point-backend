import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyService } from "../middleware/verifyService";
import { CreateCategoryController } from "../modules/Category/CreateCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/Category/DeleteCategory/DeleteCategoryController";
import { ListcategoriesController } from "../modules/Category/ListCategories/ListCategoriesContoller";
import { UpdateCategoryController } from "../modules/Category/UpdateCategory/UpdateCategoryController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListcategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.use(verifyAuthentication, verifyService);
categoriesRoutes.post(
  "/create",
  verifyAuthentication,
  createCategoryController.handle
);
categoriesRoutes.patch("/update", updateCategoryController.handle);
categoriesRoutes.delete("/delete/:id", deleteCategoryController.handle);

export { categoriesRoutes };
