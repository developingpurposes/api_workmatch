import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { handleError } from "./errors/handleErrors";
import { sessionRoutes } from "./routers/session.routes";
import { userRoutes } from "./routers/user.routes";
import { techlogiesRoutes } from "./routers/technologies/technologies.routes";
import { projectsRoutes } from "./routers/projects/projects.routes";

export const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/technologies", techlogiesRoutes);
app.use("/projects", projectsRoutes);

app.use(handleError);
