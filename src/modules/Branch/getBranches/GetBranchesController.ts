import { Request, Response } from "express";
import { GetBranchesService } from "./GetBranchesService";

class GetBranchesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getBranchesService = new GetBranchesService();

    const branches = await getBranchesService.execute();

    return res.send(branches);
  }
}

export { GetBranchesController };
