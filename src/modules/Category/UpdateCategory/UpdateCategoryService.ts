import { Category } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface IRequest {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}
class UpdateCategoryService {
  async execute({ id, name, subcategories }: IRequest): Promise<Category> {
    const categoryExists = await prisma.category.findUnique({ where: { id } });

    if (!categoryExists) throw new AppError("Category ID doesn't exists");

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        subcategories: {
          update: subcategories.map((sub) => ({
            where: { id: sub.id },
            data: { name: sub.name },
          })),
        },
      },
    });

    return category;
  }
}

export { UpdateCategoryService };
