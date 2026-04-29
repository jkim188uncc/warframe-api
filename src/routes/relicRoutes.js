import express from "express";
import {
  createRelic,
  getAllRelics,
  getRelicById,
  updateRelic,
  deleteRelic
} from "../controllers/relicController.js";

import {
  authenticate,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE (ADMIN ONLY) */
router.post("/", authenticate, authorize("ADMIN"), createRelic);

/* READ ALL (AUTH REQUIRED) */
router.get("/", authenticate, getAllRelics);

/* READ ONE */
router.get("/:id", authenticate, getRelicById);

/* UPDATE (ADMIN ONLY) */
router.put("/:id", authenticate, authorize("ADMIN"), updateRelic);

/* DELETE (ADMIN ONLY) */
router.delete("/:id", authenticate, authorize("ADMIN"), deleteRelic);

export default router;