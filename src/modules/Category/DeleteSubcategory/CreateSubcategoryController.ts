import { Request, Response } from "express";

import { z } from "zod";
import { CreateSubcategoryService } from "./CreateSubcategoryService";

class CreateSubcategoryController {
  async handle(req: Request, res: Response) {
    const getCategoryId = z.object({ id: z.string().uuid() });
    const getSubcategoryData = z.object({
      name: z.string().min(3),
    });

    const { name } = getSubcategoryData.parse(req.body);
    const { id } = getCategoryId.parse(req.params);
    const createSubcategoryService = new CreateSubcategoryService();

    const subcategory = await createSubcategoryService.execute({
      id,
      name,
    });

    return res.status(201).send(subcategory);
  }
}

export { CreateSubcategoryController };
