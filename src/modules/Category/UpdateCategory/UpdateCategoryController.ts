import { Request, Response } from "express";
import { z } from "zod";
import { UpdateCategoryService } from "./UpdateCategoryService";

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getRequestData = z.object({
      id: z.string().uuid(),
      name: z.string(),
      subcategories: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
        })
      ),
    });

    const { id, name, subcategories } = getRequestData.parse(req.body);
    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute({
      id,
      name,
      subcategories,
    });
    return res.send(category);
  }
}

export { UpdateCategoryController };
