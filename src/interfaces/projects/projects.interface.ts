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

export interface IJoinedProjectResponse {
  nextPage: string;
  previousPage: string;
  totalPages: number;
  userProjects: IJoinedProject[];
}

export interface IJoinedProject {
  id: string;
  isConfirmed: boolean;
  projects: IProject;
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
  ownerId?: string;
  technologies: string[];
}

export interface IProjectQueue {
  user: IUserQueue;
}

interface IUserQueue {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  contact: string;
  level: string;
  userTechs: IProjectTechs[];
}
