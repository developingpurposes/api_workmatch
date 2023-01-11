import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest } from "../interfaces/users";

export const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

export const responseUserSerializer: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  email: yup.string().email(),
  username: yup.string(),
  avatarUrl: yup.string(),
  bio: yup.string(),
  level: yup.string(),
  contact: yup.string(),
  isActive: yup.boolean(),
  isAdm: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  deletedAt: yup.date(),
});

export const listUsersSerializer = yup.array(responseUserSerializer);
