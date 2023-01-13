import * as yup from "yup";
import {
  IProjectRequest,
  IProjectUpdate,
} from "../../interfaces/projects/projects.interface";

export const createdSerializerProjects: yup.SchemaOf<IProjectRequest> = yup
  .object()
  .shape({
    name: yup.string().max(50).required(),
    imgUrl: yup.string().nullable(),
    description: yup.string().nullable(),
    maxTeamSize: yup.number().required(),
    userId: yup.string().required().uuid(),
    technologies: yup.array().required(),
  });

export const updateSerializerProjects: yup.SchemaOf<IProjectUpdate> = yup
  .object()
  .shape({
    name: yup.string().max(50),
    imgUrl: yup.string(),
    description: yup.string(),
    technologies: yup.array(),
  });
