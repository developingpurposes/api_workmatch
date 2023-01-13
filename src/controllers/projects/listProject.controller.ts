import { Request, Response } from "express";
import { listsProjectsServices } from "../../services/projects/listProjects.service";

export const listsProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await listsProjectsServices();

  return res.status(200).json(data);
};
