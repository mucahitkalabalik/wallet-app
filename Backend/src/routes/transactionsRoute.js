import express from "express";
import {
  getTransactionsByUserId,
  createTransaction,
  deleteTransaction,
  getSummaryById,
} from "../controller/transactionsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);
router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryById);

export default router;
