import { Request, Response } from "express";

import { z } from "zod";
import { AppError } from "../../config/AppError";
import { CreateCategoryService } from "./CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const getRequestData = z.object({
      name: z.string().min(3),
      subcategories: z
        .object({
          name: z.string().min(3),
        })
        .array(),
    });
    const { name, subcategories } = getRequestData.parse(req.body);

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      subcategories,
    });

    return res.status(201).send(category);
  }
}

export { CreateCategoryController };
