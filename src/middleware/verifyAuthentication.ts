import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../config/AppError";
import auth from "../config/auth";
import prisma from "../database/prisma";

interface IPayLoad {
  sub: string;
}

export async function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token is missing");

  const [, token] = authHeader.split(" ");
  console.log(token);

  try {
    const { sub: user_id } = (await verify(token, auth.JWT_SECRET)) as IPayLoad;
    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user) throw new AppError("User does not exists");
    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    throw new AppError("Invalid Token");
  }
}
