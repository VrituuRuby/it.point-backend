import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { CreateUserController } from "../modules/User/createUser/CreateUserController";
import { GetUserController } from "../modules/User/getUser/GetUserController";
import { GetUsersByNameController } from "../modules/User/getUsers/GetUsersByNameController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const getUserByNameController = new GetUsersByNameController();

usersRoutes.post("/create", createUserController.handle);
usersRoutes.get("/search", getUserByNameController.handle);
usersRoutes.get("/", verifyAuthentication, getUserController.handle);

export { usersRoutes };
