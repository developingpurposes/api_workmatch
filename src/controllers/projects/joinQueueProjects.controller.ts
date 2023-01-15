import { Request, Response } from "express";
import { joinQueueProjectsServices } from "../../services/projects/joinQueueProjects.service";

export const joinQueueProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: string = req.params.id;

  const userId: string = req.user.id;

  const data = await joinQueueProjectsServices(projectId, userId);

  return res.status(200).json({ message: data });
};
