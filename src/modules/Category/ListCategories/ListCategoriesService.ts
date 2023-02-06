import { Category } from "@prisma/client";
import prisma from "../../../database/prisma";

class ListCategoriesService {
  async execute(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      include: { subcategories: true },
    });

    return categories;
  }
}

export { ListCategoriesService };
