import { Branch } from "@prisma/client";
import prisma from "../../../database/prismaClient";

interface ICreateBranchDTO {
  name: string;
}

class CreateBranchService {
  private repository = prisma.branch;
  async execute({ name }: ICreateBranchDTO): Promise<Branch> {
    const branchExists = await this.repository.findFirst({ where: { name } });
    if (branchExists) throw new Error("Branch already exists!");

    const branch = await this.repository.create({ data: { name } });
    return branch;
  }
}

export { CreateBranchService, ICreateBranchDTO };
