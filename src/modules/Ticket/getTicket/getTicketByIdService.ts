import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface IRequest {
  id: number;
  user: {
    id: string;
    role: "ADMIN" | "SERVICE" | "USER";
  };
}

class GetTicketByIdService {
  async execute({ id, user }: IRequest) {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        branch: true,
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
        notes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    if (!ticket) throw new AppError("Ticket doesn't exists");
    if (user.role === "USER" && user.id !== ticket.user_id)
      throw new AppError("User is not allowed");

    return ticket;
  }
}

export { GetTicketByIdService };
