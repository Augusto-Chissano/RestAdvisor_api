import express from "express";
import {
  addItem,
  deleteItem,
  editItem,
  getMenunInfo,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/:menuId/item", addItem);
router.put("/:menuId/item/:itemId", editItem);
router.get("/:menuId/items", getMenunInfo);
router.delete("/:menuId/item/:itemId", deleteItem);

export default router;
