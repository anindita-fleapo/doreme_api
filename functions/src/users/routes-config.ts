import { Application } from "express";
import { isAutheticated } from "../auth/autheticated";
import { isAuthorized } from "../auth/authorized";
import { create, get, getAllUser, patch, remove } from "./controllers";
/* import { create } from './controllers'   */

export function routesConfig(app: Application) {
  app.post("/users", create);

  app.get("/users", [
    isAutheticated,
    isAuthorized({ hasRole: ["users"] }),
    getAllUser,
  ]);

  app.get("/users/:id", [
    isAutheticated,
    isAuthorized({ hasRole: ["users"], allowSameUsers: true }),
    get,
  ]);

  app.patch("/users/:id", [
    isAutheticated,
    isAuthorized({ hasRole: ["users"], allowSameUsers: true }),
    patch,
  ]);

  app.delete("/users/:id", [
    isAutheticated,
    isAuthorized({ hasRole: ["users"], allowSameUsers: true }),
    remove,
  ]);
}
