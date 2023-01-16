import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users/user.interface";
import { patchUserService } from "../../services/users/patchUser.service";

export const patchUserController = async (req: Request, res: Response) => {
  const newData: IUserRequest = req.body;
  const patchUserId: string = req.params.id;
  const updatedUser = await patchUserService(newData, patchUserId);
  return res.status(200).json(updatedUser);
};
