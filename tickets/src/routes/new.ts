import { Router } from "express";
import { requireAuth } from "./middlewares/require-auth";

const router = Router();

router.post("/api/tickets", requireAuth, (req, res) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
