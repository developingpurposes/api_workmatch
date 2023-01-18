import { Schema } from "inspector";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITechnologyReturn } from "../../interfaces/technologies/technologies.interface";
import {
  IUser,
  IUserForgotPassword,
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
  isAdm: yup.boolean().notRequired().default(false),
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
  forgotPassword: yup.string().nullable().notRequired(),
  usersTechs: yup.array().nullable().notRequired(),
  deletedAt: yup.date().nullable(),
  updatedAt: yup.date(),
  createdAt: yup.date(),
  isAdm: yup.boolean(),
  isActive: yup.boolean(),
  contact: yup.string().nullable(),
  level: yup.string().nullable(),
  bio: yup.string().nullable(),
  avatarUrl: yup.string().nullable().notRequired(),
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email(),
  id: yup.string(),
});

export const listUsersSerializer = yup.array(responseUserSerializer);

export const usersListSerializer: yup.SchemaOf<IUser[]> = yup.array().of(
  yup.object().shape({
    userTechs: yup.array().of(
      yup.object({
        technologies: yup.object({
          icon: yup.string().required(),
          name: yup.string().required(),
        }),
      })
    ),
    forgotPassword: yup.string().nullable().notRequired(),
    usersTechs: yup.array().nullable().notRequired(),
    deletedAt: yup.date().nullable(),
    updatedAt: yup.date(),
    createdAt: yup.date(),
    isAdm: yup.boolean(),
    isActive: yup.boolean(),
    contact: yup.string().nullable(),
    level: yup.string().nullable(),
    bio: yup.string().nullable(),
    avatarUrl: yup.string().nullable().notRequired(),
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    id: yup.string(),
  })
);

export const userListSerializer: yup.SchemaOf<IUser> = yup.object().shape({
  userTechs: yup.array().of(
    yup.object({
      technologies: yup.object({
        icon: yup.string().required(),
        name: yup.string().required(),
      }),
    })
  ),
  forgotPassword: yup.string().nullable().notRequired(),
  usersTechs: yup.array().nullable().notRequired(),
  deletedAt: yup.date().nullable(),
  updatedAt: yup.date(),
  createdAt: yup.date(),
  isAdm: yup.boolean(),
  isActive: yup.boolean(),
  contact: yup.string().nullable(),
  level: yup.string().nullable(),
  bio: yup.string().nullable(),
  avatarUrl: yup.string().nullable().notRequired(),
  name: yup.string(),
  username: yup.string(),
  email: yup.string().email(),
  id: yup.string(),
});

export const userForgotPasswordSerializer: SchemaOf<IUserForgotPassword> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  });
