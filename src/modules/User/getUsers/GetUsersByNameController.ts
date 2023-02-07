import { Request, Response } from "express";
import { z } from "zod";
import { GetUsersByNameService } from "./GetUsersByNameService";

class GetUsersByNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getUserName = z.object({
      name: z.string(),
    });

    const { name } = getUserName.parse(req.query);

    if (!name) return res.send([]);
    const getUserByNameService = new GetUsersByNameService();

    const users = await getUserByNameService.execute({ name });

    return res.status(200).send(users);
  }
}

export { GetUsersByNameController };
