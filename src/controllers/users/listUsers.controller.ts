import { Request, Response } from "express";
import { listUserService } from "../../services/users/listUsers.service";

export const listUsersController = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;

  const limit: number = Number(req.query.limit) || 10;

  const usersList = await listUserService(limit, page);
  return res.status(200).json(usersList);
};
