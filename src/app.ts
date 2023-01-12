import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { handleError } from "./errors/handleErrors";
import { techlogiesRoutes } from "./routers/technologies/technologies.routes";
import { userRoutes } from "./routers/users/user.routes";
import { sessionRoutes } from "./routers/session/session.routes";

export const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/technologies", techlogiesRoutes);

app.use(handleError);
