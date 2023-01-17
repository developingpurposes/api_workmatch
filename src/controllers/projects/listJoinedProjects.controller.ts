import { Request, Response } from "express";
import { listJoinedProjectsServices } from "../../services/projects/listJoinedProjects.services";

export const listJoinedProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const userId: string = req.user.id;

  const data = await listJoinedProjectsServices(limit, page, userId);

  return res.status(200).json(data);
};
