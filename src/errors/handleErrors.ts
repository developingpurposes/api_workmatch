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

  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.errors });
  }
  if (error instanceof SyntaxError) {
    return res.status(404).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error.",
  });
};
