<<<<<<< HEAD
=======
import { ITechnologyResponse } from "../technologies/technologies.interface";

>>>>>>> 4a60a9cc2130b4a2e488b11c9866192a3f428b38
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
<<<<<<< HEAD
  projectTech: string[];
=======
  projectTech: ITechnologyResponse[];
>>>>>>> 4a60a9cc2130b4a2e488b11c9866192a3f428b38
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
