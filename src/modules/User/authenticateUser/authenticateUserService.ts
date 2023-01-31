import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

import dotenv from "dotenv";
import auth from "../../../config/auth";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}

class AuthenticateUserService {
  async execute({ username, password }: IRequest): Promise<IResponse> {
    dotenv.config();
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new AppError("Wrong username or password", 403);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Wrong username or password", 403);

    const token = sign({}, auth.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }
}

export { AuthenticateUserService };
