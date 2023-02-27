import { Request, Response } from "express";
import { z } from "zod";
import { DeleteSubcategoryService } from "./DeleteSubcategoryService";

class DeleteSubcategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getRequestData = z.object({
      id: z.string().uuid(),
    });

    const { id } = getRequestData.parse(req.params);
    const deleteSubcategoryService = new DeleteSubcategoryService();

    await deleteSubcategoryService.execute(id);

    return res.status(204).send();
  }
}

export { DeleteSubcategoryController };
