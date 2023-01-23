import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "../../../database/prisma";

interface CreateUserDTO {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  branch_id: string;
}

class CreateUserService {
  async execute({
    email,
    name,
    branch_id,
    username,
    password,
  }: CreateUserDTO): Promise<User> {
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

    return user;
  }
}

export { CreateUserService };
