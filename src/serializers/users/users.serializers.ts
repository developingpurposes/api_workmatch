import { Schema } from "inspector";
import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUser,
  IUserLogin,
  IUserRequest,
  IUserUpdate,
} from "../../interfaces/users/user.interface";

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

export const updatedUserSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  email: yup.string().email(),
  username: yup.string(),
  password: yup.string(),
  name: yup.string(),
  avatarUrl: yup.string().nullable(),
  bio: yup.string().nullable(),
  level: yup.string().nullable(),
  contact: yup.string().nullable(),
  technologies: yup.array(),
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
  technologies: yup.array().notRequired(),
});

export const listUsersSerializer = yup.array(responseUserSerializer);