import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { AppError } from "./appError";

export const handleError = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error.message.includes("invalid input syntax")) {
    return res.status(404).json({ message: "invalid input syntax" });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.errors });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error.",
  });
};
