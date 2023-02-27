import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

class DeleteCategoryService {
  async execute(id: string): Promise<void> {
    const categoryExists = await prisma.category.findUnique({ where: { id } });
    if (!categoryExists) throw new AppError("Category doesn't exists!");

    await prisma.category.delete({ where: { id } });
  }
}

export { DeleteCategoryService };
