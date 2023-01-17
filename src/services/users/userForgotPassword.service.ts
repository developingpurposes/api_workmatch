import dataSource from "../../data-source";
import { forgotPasswordSendEmail } from "../../email/forgotPassword.email";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";


export const userForgotPasswordService = async (emailUser: string) => {
     
     const repositoryUser = dataSource.getRepository(Users)
     const userExists = await repositoryUser.findOne({ where: { email: emailUser } })
    
     if (!userExists) {
          throw new AppError("user don't exist",409)
     }
     

     const token = jwt.sign(
          {email: userExists.email},
          process.env.SECRET_KEY,
          {
               subject: userExists.id,
               expiresIn: "10min"
          }
     )

     userExists.forgotPassword = token
     await repositoryUser.save(userExists)

     const link = `https://backend-workmatch.onrender.com/users/resetpassword/${token}`
     const date = new Date()
     
     const dateFormatted = date.toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
     


     await forgotPasswordSendEmail(emailUser,link,userExists.name,dateFormatted)

     

     return { message: "password recovery email sent" }
}