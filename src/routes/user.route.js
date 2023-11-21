import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  login,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", login);
router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);

export default router;
