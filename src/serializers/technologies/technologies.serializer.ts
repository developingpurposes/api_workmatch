import * as yup from "yup";
import {ITechnologies} from "../../interfaces/technologies/technologies.interface"

export const createdSerializerTechnologies:yup.SchemaOf<ITechnologies> = yup.object().shape({
     name: yup.string().max(50).required(),
     icon: yup.string().max(50).required()
}) 



