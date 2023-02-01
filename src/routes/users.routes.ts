import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { CreateUserController } from "../modules/User/createUser/CreateUserController";
import { GetUserController } from "../modules/User/getUser/GetUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

usersRoutes.post("/create", createUserController.handle);
usersRoutes.get("/", verifyAuthentication, getUserController.handle);

export { usersRoutes };
