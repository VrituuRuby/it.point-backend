import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyService } from "../middleware/verifyService";
import { CreateTicketController } from "../modules/Ticket/createTicket/CreateTicketController";
import { ListTicketsController } from "../modules/Ticket/listTickets/ListTicketsController";

const ticketsRoutes = Router();
const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();

ticketsRoutes.post("/create", createTicketController.handle);
ticketsRoutes.get(
  "/",
  verifyAuthentication,
  verifyService,
  listTicketsController.handle
);

export { ticketsRoutes };
