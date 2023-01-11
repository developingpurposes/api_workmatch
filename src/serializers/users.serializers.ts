import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin } from "../interfaces/users";

export const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

