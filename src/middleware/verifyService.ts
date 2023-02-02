import { NextFunction, Request, Response } from "express";
import { AppError } from "../config/AppError";

export async function verifyService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { role } = req.user;

  if (role !== "SERVICE") throw new AppError("User isn't a member of SERVICE");

  next();
}
