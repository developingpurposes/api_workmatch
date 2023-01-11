import { ITechnology } from "../technologies/technologies.interface";

export interface IProject {
  id: string;
  name: string;
  imgUrl?: string;
  description?: string;
  maxTeamSize: number;
  userId: string;
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

export interface IProjectCompleteResponse {
  name: string;
  imgUrl: string;
  description: string;
  maxTeamSize: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
  queueList: IQueue[];
  techsList: ITechnology[];
}
