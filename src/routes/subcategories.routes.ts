import { Router } from "express";
import { CreateSubcategoryController } from "../modules/Subcategory/CreateSubcategory/CreateSubcategoryController";
import { DeleteSubcategoryController } from "../modules/Subcategory/DeleteSubcategory/DeleteSubcategoryController";

const subcategoriesRoutes = Router();

const createSubcategoryController = new CreateSubcategoryController();
const deleteSubcategoryController = new DeleteSubcategoryController();

subcategoriesRoutes.post("/create", createSubcategoryController.handle);
subcategoriesRoutes.delete("/delete/:id", deleteSubcategoryController.handle);

export { subcategoriesRoutes };
