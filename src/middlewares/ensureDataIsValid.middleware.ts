import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    try {
      const validatedData = await schema.validate(
        { ...req.body, userId },
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
