import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

class GetTicketByIdService {
  async execute(id: number) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            branch: true,
            email: true,
            branch_id: true,
            id: true,
            name: true,
            role: true,
            tickets: true,
          },
        },
        category: true,
        subcategory: true,
      },
    });

    if (!ticket) throw new AppError("Ticket doesn't exists");

    return ticket;
  }
}

export { GetTicketByIdService };
