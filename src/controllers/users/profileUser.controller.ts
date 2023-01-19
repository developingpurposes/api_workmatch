import { Request, Response } from "express";
import { getUserService } from "../../services/users/getUser.service";

export const profileUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.user.id;

  const data = await getUserService(userId);

  return res.status(200).json(data);
};
