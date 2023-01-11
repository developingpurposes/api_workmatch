import express from "express"
import { handleError }  from "./errors/handleErrors";
import { sessionRoutes } from "./routers/session.routes";

export const app = express();
app.use(express.json());

app.use("/login", sessionRoutes)

app.use(handleError);