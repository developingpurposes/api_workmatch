import * as yup from "yup";
import {
  IProject,
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
    ownerId: yup.string().required().uuid(),
    technologies: yup.array().required(),
  });

export const updateSerializerProjects: yup.SchemaOf<IProjectUpdate> = yup
  .object()
  .shape({
    name: yup.string().max(50).notRequired(),
    imgUrl: yup.string().notRequired(),
    description: yup.string().notRequired(),
    technologies: yup.array().notRequired(),
  });

export const listSerializerProjects: yup.SchemaOf<IProject[]> = yup.array().of(
  yup.object().shape({
    projectTechs: yup.array().of(
      yup.object({
        technologies: yup.object({
          icon: yup.string().required(),
          name: yup.string().required(),
        }),
      })
    ),
    owner: yup.object({
      contact: yup.string().notRequired().nullable(),
      level: yup.string().notRequired().nullable(),
      avatarUrl: yup.string().notRequired().nullable(),
      name: yup.string().required(),
      email: yup.string().required(),
      id: yup.string().required(),
    }),
    deletedAt: yup.date().notRequired().nullable(),
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    isActive: yup.boolean().required(),
    maxTeamSize: yup.number().required(),
    description: yup.string().notRequired().nullable(),
    imgUrl: yup.string().notRequired().nullable(),
    name: yup.string().required(),
    id: yup.string().required(),
  })
);
