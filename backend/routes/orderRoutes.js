import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Route home Orders
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
//Route my orders
router.route("/myorders").get(protect, getMyOrders);
//Route id Orders
router.route("/:id").get(protect, getOrderById);
//Route idpay de orders
router.route("/:id/pay").put(protect, updateOrderToPaid);
//Route id Deviler order
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
