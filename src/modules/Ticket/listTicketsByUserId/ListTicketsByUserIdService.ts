import { Ticket } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface IRequest {
  id: string;
}
class ListTicketsByUserIdService {
  async execute({ id }: IRequest): Promise<Ticket[]> {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) throw new AppError("User doesn't exists", 404);

    const tickets = await prisma.ticket.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        user_id: id,
      },
      include: {
        category: true,
        subcategory: true,
        user: {
          select: {
            branch: true,
            branch_id: true,
            email: true,
            name: true,
            id: true,
            username: true,
          },
        },
      },
    });

    return tickets;
  }
}

export { ListTicketsByUserIdService };
