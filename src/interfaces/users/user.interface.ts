export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRequest {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface IUserRequestAdmin {
  email: string;
  password: string;
  username: string;
  name: string;
  isAdm?: boolean;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  contact?: string;
  level?: string;
  isActive: boolean;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  usersTechs?: string[];
  forgotPassword?: string;
}

export interface IUserUpdate {
  username?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  contact?: string;
  level?: string;
  technologies?: string[];
}

export interface IUserResponse {
  nextPage: string;
  previousPage: string;
  totalPages: number;
  users: IUser[];
}
