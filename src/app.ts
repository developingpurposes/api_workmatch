import express from "express"
import handleError from "./errors/handleErrors";

export const app = express();
app.use(express.json());

// app.use(rotas)


app.use(handleError);