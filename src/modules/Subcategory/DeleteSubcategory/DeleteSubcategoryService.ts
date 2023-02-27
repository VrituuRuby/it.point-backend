import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

class DeleteSubcategoryService {
  async execute(id: string): Promise<void> {
    const subcategoryExists = await prisma.subCategory.findUnique({
      where: { id },
    });
    if (!subcategoryExists) throw new AppError("Subcategory doesn't exists!");

    await prisma.subCategory.delete({ where: { id } });
  }
}

export { DeleteSubcategoryService };
