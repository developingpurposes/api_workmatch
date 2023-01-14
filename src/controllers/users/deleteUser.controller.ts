import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
  const deleteUserId: string = req.params.id;
  await deleteUserService(deleteUserId);
  return res.status(204).json();
};
