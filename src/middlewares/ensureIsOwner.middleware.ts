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

  const projectSeach = await dataSource
    .createQueryBuilder()
    .from(Projects, "projects")
    .leftJoin("projects.user", "user")
    .select(["projects", "user.id"])
    .where("projects.id = :id", { id: projectId })
    .getOne();

  if (projectSeach.owner.id !== userId) {
    throw new AppError("User not authorization!", 403);
  }
  next();
};
