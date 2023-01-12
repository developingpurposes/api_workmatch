import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureAuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: "invalid token!"
        })
    }

    token = token.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY,(error, decoded: any) => {
        if(error){
            res.status(401).json({
                message: error.message
            })
        }

        req.user = {
            id: decoded.sub,
            isActive: decoded.isActive,
            isAdm: decoded.isAdm
        }
       
        return next()
    })

}

