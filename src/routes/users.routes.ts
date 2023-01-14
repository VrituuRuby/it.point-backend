import { Router } from "express";
import { CreateUserController } from "../modules/User/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
