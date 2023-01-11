import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUser,
  IUserLogin,
  IUserRequest,
} from "../interfaces/users/user.interface";

export const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

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
  name: yup.string(),
  avatarUrl: yup.string().nullable().notRequired(),
  bio: yup.string().nullable(),
  level: yup.string().nullable(),
  contact: yup.string().nullable(),
  isActive: yup.boolean(),
  isAdm: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  deletedAt: yup.date().nullable(),
});

export const listUsersSerializer = yup.array(responseUserSerializer);
