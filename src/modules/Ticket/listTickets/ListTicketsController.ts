import { Request, Response } from "express";
import { ListTicketsService } from "./ListTicketsService";

class ListTicketsController{
    async handle(req: Request, res: Response): Promise<Response>{
        const listTicketsService = new ListTicketsService()
        const tickets = await listTicketsService.execute()

        return res.status(200).send(tickets)
    }
}

export {ListTicketsController}