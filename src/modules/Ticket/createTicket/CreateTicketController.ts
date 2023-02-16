import { Request, Response } from "express";
import { z } from "zod";
import { CreateTicketService } from "./CreateTicketService";

class CreateTicketController {
  async handle(req: Request, res: Response) {
    const getTicketData = z.object({
      title: z.string(),
      email: z.string().nullable(),
      branch_id: z.string().nullable(),
      description: z.string(),
      phone: z.string(),
      category_id: z.string().uuid(),
      subcategory_id: z.string().uuid(),
      user_id: z.string().uuid(),
    });

    const ticketData = getTicketData.parse(req.body);
    const createTicketService = new CreateTicketService();

    const ticket = await createTicketService.execute(ticketData);

    return res.status(201).send(ticket);
  }
}

export { CreateTicketController };
