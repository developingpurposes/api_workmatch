import { ITechnology } from "../technologies";

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
    userId: string;
  }
  
  export interface IProjectUpdate {
    name?: string;
    imgUrl?: string;
    description?: string;
    maxTeamSize: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    userId: string;
  }

  export interface IQueue {
    isConfirmed: boolean;
    userId: string;
    projectId: string;
  }

  export interface IProjectCompleteResponse{
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