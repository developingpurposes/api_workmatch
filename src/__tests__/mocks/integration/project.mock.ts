import {
  IProject,
  IProjectRequest,
} from "../../../interfaces/projects/projects.interface";

export const mockedProjectCreate: IProjectRequest = {
  name: "salve os dog",
  imgUrl: "894985181",
  description: "de comida aos dogs de rua",
  maxTeamSize: 8,
  user: "1233",
  projectTech: ["react", "javascript", "python"],
};

export const invalidMockedProjectCreate = {
  name: 3555555,
  description: "fon",
};
