import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const ownerId: string = req.user.id;
    try {
      const validatedData = await schema.validate(
        { ...req.body, ownerId },
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );
      req.body = validatedData;
      return next();
    } catch (error) {
      return res.status(400).json({
        message: error.errors,
      });
    }
  };



export const ensureDataIsValidUserForgotPasswordMiddleware = (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const validatedData = await schema.validate(req.body, {
           abortEarly: false,
           stripUnknown: true,      
      })

      req.body = validatedData
      return next()
      
 } catch (error) {
    return res.status(400).json({
      message: error.errors,
    });
 }
  }
