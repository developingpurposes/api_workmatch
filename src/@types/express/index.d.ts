import * as express from "express";

declare global {
  namespace Express {
    interface Request {
// interface de chaves adicionadas no objeto da requisição
    }
  }
}
