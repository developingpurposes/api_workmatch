import { Request, Response } from "express";
import { listQueueProjectsServices } from "../../services/projects/listQueueProjects.service";

export const listQueueProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId = req.params.id;

  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const data = await listQueueProjectsServices(limit, page, projectId);

  return res.status(200).json(data);
};
