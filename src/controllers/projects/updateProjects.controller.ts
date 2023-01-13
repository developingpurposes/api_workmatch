import { Request, Response } from "express";
import { IProjectUpdate } from "../../interfaces/projects/projects.interface";
import { updateProjectsServices } from "../../services/projects/updateProjects.service";

export const updateProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newProject: IProjectUpdate = req.body;

  const projectId: string = req.params.id;

  const data = await updateProjectsServices(newProject, projectId);

  return res.status(200).json(data);
};
