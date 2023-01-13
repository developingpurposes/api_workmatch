import { Request, Response } from "express";
import { listUserService } from "../../services/users/listUsers.service";

export const listUsersController = async (req: Request, res: Response) => {
  const usersList = await listUserService();
  return res.status(200).json(usersList);
};
