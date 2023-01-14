import { hash } from "bcrypt";
import prisma from "../../../database/prismaClient";
import { CreateUserDTO } from "../CreateUserDTO";

enum UserRoles {
  admin = "admin",
  service = "service",
  user = "user",
}

class CreateUserService {
  async execute({
    email,
    name,
    role = UserRoles.user,
    username,
    password,
  }: CreateUserDTO) {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) throw new Error("Email is already registered");

    const user = await prisma.user.create({
      data: { email, name, password: await hash(password, 8), role, username },
    });

    return user;
  }
}

export { CreateUserService };
