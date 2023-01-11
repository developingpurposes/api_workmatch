import express from "express";
import { handleError }  from "./errors/handleErrors";
import { sessionRoutes } from "./routers/session.routes";
import { userRoutes } from "./routers/users/user.routes";

export const app = express();
app.use(express.json());

// app.use(rotas)
app.use("/users", userRoutes);
app.use("/login", sessionRoutes)

app.use(handleError);
