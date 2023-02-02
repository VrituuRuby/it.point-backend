import { Request, Response } from "express";
import { z } from "zod";
import { AuthenticateUserService } from "./authenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getReqData = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { password, username } = getReqData.parse(req.body);

    const authenticateUserService = new AuthenticateUserService();

    const response = await authenticateUserService.execute({
      username,
      password,
    });

    return res.status(200).send(response);
  }
}

export { AuthenticateUserController };
