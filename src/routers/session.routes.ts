import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";

export const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);
