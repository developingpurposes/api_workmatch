import { Request, Response, NextFunction } from "express";
import dataSource from "../data-source";
import { Projects } from "../entities/projects.entity";
import { AppError } from "../errors/appError";

export const ensureIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.id;

  const projectId = req.params.id;

  const projectSearch = await dataSource
    .createQueryBuilder()
    .from(Projects, "projects")
    .leftJoin("projects.owner", "owner")
    .select(["projects", "owner.id"])
    .where("projects.id = :id", { id: projectId })
    .withDeleted()
    .getOne();

  if (projectSearch.owner.id !== userId) {
    throw new AppError("Missing authorization!", 401);
  }
  next();
};
