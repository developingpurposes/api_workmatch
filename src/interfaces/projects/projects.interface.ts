import { IUpdateTechnology } from "../technologies/technologies.interface";
import { IUserUpdate } from "../users/user.interface";

export interface IProjectResponse {
  nextPage: string;
  previousPage: string;
  totalPages: number;
  projects: IProject[];
}
export interface IProject {
  id: string;
  name: string;
  imgUrl?: string;
  description?: string;
  maxTeamSize: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  owner: IOwner;
  projectTechs: IProjectTechs[];
}

interface IOwner {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  level?: string;
  contact?: string;
}

interface IProjectTechs {
  technologies: {
    icon: string;
    name: string;
  };
}

export interface IProjectUpdate {
  name?: string;
  imgUrl?: string;
  description?: string;
  technologies?: string[];
}

export interface IQueue {
  isConfirmed: boolean;
  ownerId: string;
  projectId: string;
}

export interface IProjectRequest {
  name: string;
  imgUrl?: string;
  description?: string;
  maxTeamSize: number;
  ownerId: string;
  technologies: string[];
}
