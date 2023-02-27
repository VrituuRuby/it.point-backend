import { SubCategory } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface ICreateCategory {
  name: string;
  id: string;
}

class CreateSubcategoryService {
  async execute({ name, id }: ICreateCategory): Promise<SubCategory> {
    const categoryExists = await prisma.category.findUnique({
      where: { id },
    });
    if (!categoryExists) throw new AppError("Category doesn't exist");

    const subcategory = await prisma.subCategory.create({
      data: {
        name,
        category_id: id,
      },
    });

    return subcategory;
  }
}

export { CreateSubcategoryService };
