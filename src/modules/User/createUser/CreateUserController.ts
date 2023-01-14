import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { branch_id, email, name, role, username, password } = req.body;

    const createUserUseCase = new CreateUserService();
    const response = await createUserUseCase.execute({
      branch_id,
      email,
      name,
      password,
      role,
      username,
    });

    return res.status(201).send(response);
  }
}

export { CreateUserController };
