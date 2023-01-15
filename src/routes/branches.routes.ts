import { Router } from "express";
import { CreateBranchController } from "../modules/Branch/createBranch/CreateBranchController";

const branchesRoutes = Router();

const createBranchController = new CreateBranchController();

branchesRoutes.post("/create", createBranchController.handle);

export { branchesRoutes };
