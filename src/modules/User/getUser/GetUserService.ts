import { User } from "@prisma/client";
import { AppError } from "../../../config/AppError";
import prisma from "../../../database/prisma";

interface UserData {
  id: string;
  branch_id: string | null;
  name: string;
  username: string;
  email: string;
  role: "SERVICE" | "ADMIN" | "USER";
}

class GetUserService {
  async execute(user_id: string): Promise<UserData> {
    const user = await prisma.user.findFirst({ where: { id: user_id } });
    if (!user) throw new AppError("User doesn't exists");
    return {
      id: user.id,
      branch_id: user.branch_id,
      email: user.email,
      name: user.name,
      role: user.role,
      username: user.username,
    };
  }
}

export { GetUserService };
