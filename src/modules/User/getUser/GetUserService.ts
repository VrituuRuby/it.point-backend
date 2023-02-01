import { User } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

class GetUserService {
  async execute(user_id: string): Promise<User> {
    const user = await prisma.user.findFirst({ where: { id: user_id } });
    if (!user) throw new AppError("User doesn't exists");
    return user;
  }
}

export { GetUserService };
