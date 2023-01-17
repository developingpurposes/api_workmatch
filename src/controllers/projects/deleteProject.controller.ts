import { Request, Response } from "express";
import { deleteProjectsServices } from "../../services/projects/deleteProjects.service";

export const deleteProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: string = req.params.id;

  await deleteProjectsServices(projectId);

  return res.status(204).send();
};
