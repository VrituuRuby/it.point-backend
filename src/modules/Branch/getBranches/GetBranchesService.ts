import { Branch } from "@prisma/client";
import prisma from "../../../database/prisma";

class GetBranchesService {
  async execute(): Promise<Branch[]> {
    const branches = await prisma.branch.findMany();

    return branches;
  }
}

export { GetBranchesService };
