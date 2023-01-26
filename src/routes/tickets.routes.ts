import { Router } from "express";
import { CreateTicketController } from "../modules/Ticket/CreateTicketController";
import { ListTicketsController } from "../modules/Ticket/ListTicketsController";

const ticketsRoutes = Router();
const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();

ticketsRoutes.post("/create", createTicketController.handle);
ticketsRoutes.get("/", listTicketsController.handle)

export { ticketsRoutes };
