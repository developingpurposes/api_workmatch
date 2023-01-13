import { IProjectRequest } from "../../../interfaces/projects/projects.interface";

export const mockedProjectCreate: IProjectRequest = {
  name: "salve os dog",
  imgUrl: "894985181",
  description: "de comida aos dogs de rua",
  maxTeamSize: 8,
  ownerId: "1233",
  technologies: ["react", "javascript", "python"],
};

export const invalidMockedProjectCreate = {
  name: 3555555,
  description: "fon",
};
