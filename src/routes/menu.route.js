import express from "express";
import {
  addItem,
  editItem,
  getMenunInfo,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/:menuId/item", addItem);
router.put("/:menuId/item/:itemId", editItem);
router.get("/:menuId/items", getMenunInfo);

export default router;
