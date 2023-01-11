export interface IUserRequest {
  email: string;
  password: string;
  username: string;
  name: string;
  isAdm?: boolean;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  level: string;
  contact: string;
  isActive: boolean;
  isAdm: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
