import prisma from "../../../database/prisma";

interface IRequest {
  name: string;
}

interface UsersResponse {
  name: string;
  id: string;
}

class GetUsersByNameService {
  async execute({ name }: IRequest): Promise<UsersResponse[]> {
    const users = await prisma.user.findMany({
      select: { name: true, id: true, branch: true, email: true },
      where: { name: { contains: name, mode: "insensitive" } },
    });

    return users;
  }
}

export { GetUsersByNameService };
