import express from "express";
import {
  getHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
} from "../controllers/houseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHouses);
router.get("/:id", getHouse);
router.post("/", createHouse);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);

// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
