import { Category } from "@prisma/client";
import prisma from "../../database/prisma";

interface ICreateCategory {
  name: string;
  subcategories: {
    name: string;
  }[];
}

class CreateCategoryService {
  async execute({ name, subcategories }: ICreateCategory): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name,
        subcategories: {
          create: subcategories.map((sub) => ({ name: sub.name })),
        },
      },
      include: {
        subcategories: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
