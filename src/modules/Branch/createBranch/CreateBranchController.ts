import { Request, Response } from "express";
import { CreateBranchService } from "./CreateBranchService";

class CreateBranchController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createBranchService = new CreateBranchService();
    const response = await createBranchService.execute({ name });

    return res.status(201).send(response);
  }
}

export { CreateBranchController };
