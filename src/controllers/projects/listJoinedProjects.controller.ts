import { Request, Response } from "express";
import { listJoinedProjectsService } from "../../services/projects/listJoinedProjects.service";

export const listJoinedProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const userId: string = req.user.id;

  const data = await listJoinedProjectsService(limit, page, userId);

  return res.status(200).json(data);
};
