import { Router } from "express";
import { AuthenticateUserController } from "../modules/User/authenticateUser/authenticateUserController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/session", authenticateUserController.handle);

export { authenticateRoutes };
