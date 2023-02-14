import { Note } from "@prisma/client";
import prisma from "../../../database/prisma";

interface IResponse {
  user_id: string;
  ticket_id: number;
  status: "OPEN" | "PENDING" | "IN_PROGRESS" | "CLOSED";
  isPublic?: boolean;
  description: string;
}

class CreateNoteService {
  async execute({
    user_id,
    description,
    ticket_id,
    status,
    isPublic,
  }: IResponse): Promise<Note> {
    const note = await prisma.note.create({
      data: {
        user_id,
        ticket_id,
        description,
        status,
        isPublic,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    await prisma.ticket.update({
      where: { id: ticket_id },
      data: {
        status,
        updated_at: new Date(),
      },
    });

    return note;
  }
}

export { CreateNoteService };
