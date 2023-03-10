import { Ticket } from "@prisma/client";
import prisma from "../../../database/prisma";

interface CreateTicketDTO {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  phone: string;
  category_id: string;
  subcategory_id: string;
  branch_id?: string | null;
  email?: string | null;
}
class CreateTicketService {
  async execute({
    category_id,
    description,
    email,
    branch_id,
    phone,
    subcategory_id,
    title,
    user_id,
  }: CreateTicketDTO): Promise<Ticket> {
    const ticket = await prisma.ticket.create({
      data: {
        description,
        email,
        branch_id,
        phone,
        title,
        category_id,
        subcategory_id,
        user_id,
      },
      include: {
        category: true,
        subcategory: true,
        branch: true,
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
    return ticket;
  }
}

export { CreateTicketService };
