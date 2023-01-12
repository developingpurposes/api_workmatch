import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users/user.interface";
import { createSessionService } from "../../services/session/session.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json({ token });
};
