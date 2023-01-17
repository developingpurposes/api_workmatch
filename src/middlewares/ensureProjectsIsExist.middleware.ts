import { NextFunction, Request, Response } from "express";
import dataSource from "../data-source";
import { Projects } from "../entities/projects.entity";

export const ensureProjectIsExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const projectRepository = dataSource.getRepository(Projects);

  const projectExist = await projectRepository.findOne({
    where: { name: request.body.name },
    withDeleted: true,
  });

  if (projectExist) {
    return response.status(409).json({ menssage: "Project already exists" });
  }

  return next();
};
