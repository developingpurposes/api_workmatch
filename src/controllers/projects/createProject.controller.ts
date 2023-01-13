import { Request, Response } from "express";
import { IProjectRequest } from "../../interfaces/projects/projects.interface";
import { createProjectsServices } from "../../services/projects/createProjects.service";

export const createProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newProject: IProjectRequest = req.body;

  const data = await createProjectsServices(newProject);

  return res.status(201).json(data);
};
