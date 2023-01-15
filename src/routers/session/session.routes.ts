import { Router } from "express";
import { createSessionController } from "../../controllers/session/createSession.controllers";

export const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);
