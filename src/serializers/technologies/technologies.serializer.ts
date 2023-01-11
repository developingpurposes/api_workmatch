import * as yup from "yup";
import { ICreatedTechnology } from "../../interfaces/technologies";


export const createdSerializerTechnologies:yup.SchemaOf<ICreatedTechnology> = yup.object().shape({
     name: yup.string().max(50).required(),
     icon: yup.string().max(50).required()
}) 



