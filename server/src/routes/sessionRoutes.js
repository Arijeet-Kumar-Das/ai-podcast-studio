import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createSession, getSessionById } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", authMiddleware, createSession);

router.get("/:id", authMiddleware, getSessionById);

export default router;