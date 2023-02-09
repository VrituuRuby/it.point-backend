import { Router } from "express";
import { CreateBranchController } from "../modules/Branch/createBranch/CreateBranchController";
import { GetBranchesController } from "../modules/Branch/getBranches/GetBranchesController";

const branchesRoutes = Router();

const createBranchController = new CreateBranchController();
const listsBranches = new GetBranchesController();

branchesRoutes.post("/create", createBranchController.handle);
branchesRoutes.get("/", listsBranches.handle);

export { branchesRoutes };
