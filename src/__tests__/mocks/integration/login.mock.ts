import {
  IUserFieldLogin,
  IUserLogin,
} from "../../../interfaces/users/user.interface";

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

export const mockedvalidFieldRequest: IUserFieldLogin = {
  email: "felipe@hotmail.com",
};

export const mockedInvalidFieldRequest: IUserFieldLogin = {
  email: "fabio@mail.com",
};
