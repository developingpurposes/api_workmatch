import { Request, Response } from "express";
import { listsProjectsServices } from "../../services/projects/listProjects.service";

export const listsProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const data = await listsProjectsServices(limit, page);

  return res.status(200).json(data);
};
