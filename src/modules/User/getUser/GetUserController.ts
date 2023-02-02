import { Request, Response } from "express";
import { GetUserService } from "./GetUserService";

class GetUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const getUserService = new GetUserService();

    const user = await getUserService.execute(user_id);

    return res.status(200).send(user);
  }
}

export { GetUserController };
