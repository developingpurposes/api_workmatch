import { ITechnologyResponse } from "../technologies/technologies.interface";

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
  user: string;
  userProjects: IQueue[];
  projectTech: ITechnologyResponse[];
}

export interface IProjectUpdate {
  name?: string;
  imgUrl?: string;
  description?: string;
}

export interface IQueue {
  isConfirmed: boolean;
  userId: string;
  projectId: string;
}

export interface IProjectRequest {
  name: string;
  imgUrl: string;
  description: string;
  maxTeamSize: number;
  user: string;
  projectTech: string[];
}
