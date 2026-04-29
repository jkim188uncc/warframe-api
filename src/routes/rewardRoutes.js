import express from "express";

import {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward
} from "../controllers/rewardController.js";

import {
  authenticate,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE (ADMIN ONLY) */
router.post("/", authenticate, authorize("ADMIN"), createReward);

/* READ ALL */
router.get("/", authenticate, getAllRewards);

/* READ ONE */
router.get("/:id", authenticate, getRewardById);

/* UPDATE (ADMIN ONLY) */
router.put("/:id", authenticate, authorize("ADMIN"), updateReward);

/* DELETE (ADMIN ONLY) */
router.delete("/:id", authenticate, authorize("ADMIN"), deleteReward);

export default router;