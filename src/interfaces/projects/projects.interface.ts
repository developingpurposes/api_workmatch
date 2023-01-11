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