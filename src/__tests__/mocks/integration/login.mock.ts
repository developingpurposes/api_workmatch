import { IUserLogin } from "../../../interfaces/users/user.interface";

export const mockedLoginRequest: IUserLogin = {
  email: "fabio@mail.com",
  password: "123456",
};
export const mockedLoginUpdateUserRequest: IUserLogin = {
  email: "updatetest00@mail.com",
  password: "123456",
};

export const mockedAdminLoginRequest: IUserLogin = {
  email: "rafael@mail.com",
  password: "123456",
};
