import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyService } from "../middleware/verifyService";
import { CreateSubcategoryController } from "../modules/Subcategory/CreateSubcategory/CreateSubcategoryController";
import { DeleteSubcategoryController } from "../modules/Subcategory/DeleteSubcategory/DeleteSubcategoryController";

const subcategoriesRoutes = Router();

const createSubcategoryController = new CreateSubcategoryController();
const deleteSubcategoryController = new DeleteSubcategoryController();

subcategoriesRoutes.use(verifyAuthentication, verifyService);
subcategoriesRoutes.post("/create", createSubcategoryController.handle);
subcategoriesRoutes.delete("/delete/:id", deleteSubcategoryController.handle);

export { subcategoriesRoutes };
