export interface ITechnologyReturn {
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
  
export interface ICreatedTechnology{
  name: string;
  icon: string;
}