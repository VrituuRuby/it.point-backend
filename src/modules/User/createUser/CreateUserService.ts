import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "../../../database/prismaClient";
import { AppError } from "../../../shared/AppError";
import { CreateUserDTO } from "./CreateUserDTO";

enum UserRoles {
  admin = "admin",
  service = "service",
  user = "user",
}

class CreateUserService {
  async execute({
    email,
    name,
    branch_id,
    role = UserRoles.user,
    password,
  }: CreateUserDTO): Promise<User> {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) throw new AppError("Email is already registered");

    if (branch_id) {
      const branchExists = await prisma.branch.findFirst({
        where: { id: branch_id },
      });

      if (!branchExists) throw new AppError("Branch doesn't exists!");
    }

    const user = await prisma.user.create({
      data: {
        branch_id,
        email,
        name,
        password: await hash(password, 8),
        role,
      },
    });

    return user;
  }
}

export { CreateUserService };
