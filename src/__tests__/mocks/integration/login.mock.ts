import { IUserLogin, IUserRequestAdmin } from "../../../interfaces/users/user.interface";

export const mockedLoginRequest: IUserLogin = {
  email: "fabio@mail.com",
  password: "123456",
};

export const mockedAdminLoginRequest: IUserLogin = {
  email: "rafael@mail.com",
  password: "123456",
};

export const mockedAdmin: IUserRequestAdmin = {
  email: "rafael@mail.com",
  password: "123456",
  username: "rafael",
  name: "rafael",
  isAdm: true,
};
