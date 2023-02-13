import { Request, Response } from "express";
import { z } from "zod";
import { CreateNoteService } from "./CreateNoteService";

class CreateNoteController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const { description, isPublic, status } = req.body;
    const ticket_id = Number.parseInt(id);
    const createNewNoteService = new CreateNoteService();

    const note = await createNewNoteService.execute({
      description,
      status,
      ticket_id,
      user_id,
      isPublic,
    });

    return res.send(note);
  }
}

export { CreateNoteController };
