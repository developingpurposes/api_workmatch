import { Request, Response } from "express";
import { listUserProjectsServices } from "../../services/projects/listUserProjects.service";

export const listUserProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const ownerId: string = req.params.id;

  const data = await listUserProjectsServices(limit, page, ownerId);

  return res.status(200).json(data);
};
