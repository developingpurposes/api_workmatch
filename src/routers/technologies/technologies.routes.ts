import { Router } from "express";

export const techlogiesRoutes = Router()


techlogiesRoutes.post("", (req, res) => res.status(201).json('deu certo rota post') )
techlogiesRoutes.get("",(req, res) => res.status(201).json('deu certo rota get') )
techlogiesRoutes.patch("/:id",(req, res) => res.status(201).json('deu certo rota patch') )
techlogiesRoutes.delete("/:id", (req, res) => res.status(201).json('deu certo rota delete') )
