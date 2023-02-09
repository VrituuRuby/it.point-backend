import { Request, Response } from "express";
import { GetTicketByIdService } from "./getTicketByIdService";

class GetTicketByIdController {
  async handle(req: Request, res: Response) {
    const { id_string } = req.params;

    const id = Number.parseInt(id_string);
    const getTicketByIdService = new GetTicketByIdService();

    const ticket = await getTicketByIdService.execute(id);

    return res.send(ticket);
  }
}

export { GetTicketByIdController };
