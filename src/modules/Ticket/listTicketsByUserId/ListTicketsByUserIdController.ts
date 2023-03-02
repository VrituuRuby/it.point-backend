import { Request, Response } from "express";
import { ListTicketsByUserIdService } from "./ListTicketsByUserIdService";

class ListTicketsByUserIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const listTicketsByUserIdService = new ListTicketsByUserIdService();

    const tickets = await listTicketsByUserIdService.execute({ id });

    return res.send(tickets);
  }
}

export { ListTicketsByUserIdController };
