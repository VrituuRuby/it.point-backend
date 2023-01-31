import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "../../../database/prisma";

interface CreateUserDTO {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  branch_id?: string;
}

interface Response{
  id: string,
  name: string,
  username: string,
  email: string,
  role: string,
  branch_id: string | null,
}

class CreateUserService {
  async execute({
    email,
    name,
    branch_id,
    username,
    password,
  }: CreateUserDTO): Promise<Response> {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) throw new Error("Email is already registered");

    const user = await prisma.user.create({
      data: {
        branch_id,
        email,
        name,
        password: await hash(password, 8),
        username,
      },
    });

    return {
      branch_id: user.branch_id,
      username: user.username,
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}

export { CreateUserService };
