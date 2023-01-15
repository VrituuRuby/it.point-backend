import { NextFunction, Request, Response } from "express";
import { AppError } from "../AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({
    status: "error",
    message: `Internal server error! - ${err.message}`,
  });
};
