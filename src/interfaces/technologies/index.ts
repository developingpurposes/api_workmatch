export interface ITechnology {
    id: string;
    name: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }

  export interface IUpdateTechnology {
    name?: string;
    icon?: string;
  }