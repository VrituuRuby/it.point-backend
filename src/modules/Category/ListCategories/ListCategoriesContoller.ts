import { Request, Response } from "express";
import { ListCategoriesService } from "./ListCategoriesService";

class ListcategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesService = new ListCategoriesService();
    const categories = await listCategoriesService.execute();

    return res.status(200).send(categories);
  }
}

export { ListcategoriesController };
