export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRequest {
  username: string;
  name: string;
  email: string;
  password: string;
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
}

export interface IUserUpdate {
  username?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
  contact?: string;
  level?: string;
}
