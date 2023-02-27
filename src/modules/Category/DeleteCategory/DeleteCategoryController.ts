import { Request, Response } from "express";
import { z } from "zod";
import { DeleteCategoryService } from "./DeleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getRequestData = z.object({
      id: z.string().uuid(),
    });

    const { id } = getRequestData.parse(req.params);
    const deleteCategoryService = new DeleteCategoryService();

    await deleteCategoryService.execute(id);

    return res.status(204).send();
  }
}

export { DeleteCategoryController };
