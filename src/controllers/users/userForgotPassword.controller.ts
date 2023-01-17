import { Request, Response } from "express";
import { userForgotPasswordService } from "../../services/users/userForgotPassword.service";


export const userForgotPasswordController = async (request: Request, response: Response) => {
     const emailUser = request.body.email
     const infoEmail = await userForgotPasswordService(emailUser)
     

     return response.status(200).json(infoEmail)
}