import { NextFunction, Request, Response } from "express";
import { AppError } from "../config/AppError";

export async function verifyService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.user;

  if (role === "SERVICE" || role === "ADMIN") next();

  throw new AppError("User isn't allowed");
}
