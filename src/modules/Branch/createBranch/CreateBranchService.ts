import { Branch } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface ICreateBranchDTO {
  name: string;
}

class CreateBranchService {
  private repository = prisma.branch;
  async execute({ name }: ICreateBranchDTO): Promise<Branch> {
    const branchExists = await this.repository.findFirst({ where: { name } });
    if (branchExists) throw new AppError("Branch already exists!", 400);

    const branch = await this.repository.create({ data: { name } });
    return branch;
  }
}

export { CreateBranchService, ICreateBranchDTO };
