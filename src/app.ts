import express from "express"
import handleError from "./errors/handleErrors";
import { techlogiesRoutes } from "./routers/technologies/technologies.routes";

export const app = express();
app.use(express.json());

app.use("/technologies",techlogiesRoutes)
// app.use(rotas)


app.use(handleError);