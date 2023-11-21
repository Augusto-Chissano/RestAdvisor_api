import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);
router.get("/user/:userdId", getUserOrders);
router.get("/", getAllOrders);

export default router;
