import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { branch_id, email, name, username, password } = req.body;

    const createUserUseCase = new CreateUserService();
    const response = await createUserUseCase.execute({
      branch_id,
      email,
      name,
      password,
      username,
    });

    return res.status(201).send(response);
  }
}

export { CreateUserController };
