import express from "express";
import { createFAQ, getFAQs, updateFAQ, deleteFAQ } from "../controllers/faq.controller.js";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET FAQ (accessible to all users)
router.get("/", getFAQs);

// GET FAQ (only accessible to admins)
router.get("/:id", protect, isAdmin, getFAQs);

// POST FAQ (only accessible to admins)
router.post("/", protect, isAdmin, createFAQ);

// PUT FAQ (only accessible to admins)
router.put("/:id", protect, isAdmin, updateFAQ);

// DELETE FAQ (only accessible to admins)
router.delete("/:id", protect, isAdmin, deleteFAQ);

export default router;
