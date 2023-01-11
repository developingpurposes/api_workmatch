import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { patchUserService } from "../services/users/patchUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
  const usersList = await listUsersService();
  return res.status(200).json(usersList);
};

export const patchUserController = async (req: Request, res: Response) => {
  const newData: IUserUpdate = req.body;
  const userId: string = req.user.id;
  const patchUserId: string = req.params.id;
  const updatedUser = await patchUserService(newData, userId, patchUserId);
  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const deleteUserId: string = req.params.id;
  await deleteUserService(deleteUserId);
  return res.status(204).json();
};