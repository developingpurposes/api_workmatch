import { Request, Response } from "express";
import { userResetPasswordService } from "../../services/users/userResetPassword.service";




export const userResetPasswordController = async (request: Request, response: Response) => {
     const token = request.params.token
     const infoEmail = await userResetPasswordService(token)
     

     return response.status(200).json(infoEmail)
}