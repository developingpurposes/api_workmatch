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
  userProjects: IQueue[];
  projectTech: string[];
}

export interface IProjectUpdate {
  name?: string;
  imgUrl?: string;
  description?: string;
  technologies?: string[];
}

export interface IQueue {
  isConfirmed: boolean;
  userId: string;
  projectId: string;
}

export interface IProjectRequest {
  name: string;
  imgUrl?: string;
  description?: string;
  maxTeamSize: number;
  userId: string;
  technologies: string[];
}
