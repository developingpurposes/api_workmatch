import { Request, Response } from "express";
import { queueConfirmService } from "../../services/projects/joinprojectConfirm.service";

export const queueConfirmController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ownerId: string = req.user.id;

  const queueId: string = req.params.id;

  const data = await queueConfirmService(ownerId, queueId);

  return res.status(200).json({ message: data });
};
