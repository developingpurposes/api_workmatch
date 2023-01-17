import dataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config"


export const userResetPasswordService = async (token: string) => {
     
   
   return jwt.verify(token,process.env.SECRET_KEY, async(error, decoded: any) => {
      
      if (error) {
         throw new AppError(error.message, 401);
      }

      
      const userRepository = dataSource.getRepository(Users)
      const user = await userRepository.findOne({where: {id: decoded.sub, email: decoded.email}})
     
      if (!user.isActive) {
         throw new AppError("User inactive", 401) 
      }

      if (user.forgotPassword === token) {
         const infoUser = {
            idUser: user.id,
            message: "authorized to change password"
         }

         return infoUser
      }

      
   })

}
