import { Ticket } from "@prisma/client";
import prisma from "../../../database/prisma";

class ListTicketsService {
  async execute(): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany({
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

export { ListTicketsService };
