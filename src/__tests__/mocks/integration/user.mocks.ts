import { IUserRequest } from "../../../interfaces/user.interface";

export const mockedUserCreate: IUserRequest = {
  email: "fabio@mail.com",
  password: "123456",
  username: "fabinho",
  name: "Fabio",
  isAdm: false,
};

export const mockedAdminUserCreate: IUserRequest = {
  email: "rafael@mail.com",
  password: "123456",
  username: "rafa",
  name: "Rafael",
  isAdm: true,
};
