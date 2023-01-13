import * as yup from "yup";
import {
  ICreatedTechnology,
  IUpdateTechnology,
} from "../../interfaces/technologies/technologies.interface";

export const createdSerializerTechnologies: yup.SchemaOf<ICreatedTechnology> =
  yup.object().shape({
    name: yup.string().max(50).required(),
    icon: yup.string().required(),
  });

export const updateSerializerTechnologies: yup.SchemaOf<IUpdateTechnology> = yup
  .object()
  .shape({
    name: yup.string().max(50).notRequired(),
    icon: yup.string().notRequired(),
  });
