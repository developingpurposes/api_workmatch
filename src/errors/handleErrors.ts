import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";
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

  /*   if (error.message.includes("invalid input syntax")) {
    return res.status(404).json({ message: "invalid input syntax" });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({ message: error.errors });
  }

  if (error instanceof QueryFailedError) {
    return res.status(404).json({ message: "Action not authorization!" });
  }

  if (error instanceof TypeError) {
    return res.status(403).json({ message: "Email or password not found!" });
  } */

  console.error(error);

  return res.status(500).json({
    message: "Internal Server Error.",
  });
};
