import { Request, Response } from "express";

import { z } from "zod";
import { CreateSubcategoryService } from "./CreateSubcategoryService";

class CreateSubcategoryController {
  async handle(req: Request, res: Response) {
    const getSubcategoryData = z.object({
      category_id: z.string().uuid(),
      name: z.string().min(3),
    });

    const { name, category_id } = getSubcategoryData.parse(req.body);
    const createSubcategoryService = new CreateSubcategoryService();

    const subcategory = await createSubcategoryService.execute({
      id: category_id,
      name,
    });

    return res.status(201).send(subcategory);
  }
}

export { CreateSubcategoryController };
