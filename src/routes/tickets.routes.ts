import { Router } from "express";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { verifyService } from "../middleware/verifyService";
import { CreateNoteController } from "../modules/Ticket/createNote/CreateNoteController";
import { CreateTicketController } from "../modules/Ticket/createTicket/CreateTicketController";
import { GetTicketByIdController } from "../modules/Ticket/getTicket/getTicketByIdController";
import { ListTicketsController } from "../modules/Ticket/listTickets/ListTicketsController";

const ticketsRoutes = Router();
const createTicketController = new CreateTicketController();
const listTicketsController = new ListTicketsController();
const getTicketByIdController = new GetTicketByIdController();
const createNoteController = new CreateNoteController();

ticketsRoutes.post("/create", createTicketController.handle);
ticketsRoutes.get(
  "/",
  verifyAuthentication,
  verifyService,
  listTicketsController.handle
);
ticketsRoutes.get(
  "/:id_string",
  verifyAuthentication,
  getTicketByIdController.handle
);
ticketsRoutes.post(
  "/:id/notes/create",
  verifyAuthentication,
  createNoteController.handle
);

export { ticketsRoutes };
