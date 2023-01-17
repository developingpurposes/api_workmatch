import { NextFunction, Request, Response } from "express";
import dataSource from "../data-source";
import { Technologies } from "../entities/technologies.entity";
import { AppError } from "../errors/appError";

export const ensureTechnologyIsExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.body.name && !request.body.icon) {
    throw new AppError("This request must have a valid body", 400);
  }

  const techlogiesRepository = dataSource.getRepository(Technologies);

  const techlogiesExist = await techlogiesRepository.findOne({
    where: { name: request.body.name },
  });

  if (techlogiesExist) {
    return response.status(409).json({ menssage: "Technology already exists" });
  }

  return next();
};
