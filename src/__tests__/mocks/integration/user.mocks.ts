import {
  IUserRequest,
  IUserRequestAdmin,
} from "../../../interfaces/users/user.interface";

export const mockedUserCreate: IUserRequest = {
  email: "fabio@mail.com",
  password: "123456",
  username: "fabinho",
  name: "Fabio",
};

export const mockedUserNotInfoCreate: IUserRequest = {
  email: "",
  password: "",
  username: "",
  name: "",
};

export const mockedUpdateUserCreate: IUserRequest = {
  email: "updatetest00@mail.com",
  password: "123456",
  username: "fabinho",
  name: "Fabio",
};

export const mockedAdminUserCreate: IUserRequestAdmin = {
  email: "rafael@mail.com",
  password: "123456",
  username: "rafa",
  name: "Rafael",
  isAdm: true,
};
