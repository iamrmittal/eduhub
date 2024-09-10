import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
  buySubscription,
  cancelSubscription,
} from "../controllers/otherController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form
router.route("/contact").post(contact);

// Request form
router.route("/courserequest").post(courseRequest);

// Get Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashboardStats);
router.route("/subscribe").get(isAuthenticated, buySubscription);
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);
export default router;
