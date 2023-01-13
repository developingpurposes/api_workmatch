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
  ownerId: string;
  technologies: string[];
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
