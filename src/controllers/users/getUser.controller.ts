import { Request, Response } from "express";
import { getUserService } from "../../services/users/getUser.service";

export const getUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const userData = await getUserService(userId);
  return res.status(200).json(userData);
};
