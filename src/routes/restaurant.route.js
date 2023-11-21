import express from "express";
import {
  addMenu,
  createRestaurant,
  deleteMenu,
  deleteRestaurant,
  editMenu,
  getMenunInfo,
  getRestaurantById,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

//Definindo como e onde serao armazenados os arquivos que vierem na requisicao
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//<--RESTAURANTS OPERATIONS ONLY-->//
router.post("/", upload.single("image"), createRestaurant);
router.get("/", getRestaurants);
router.get("/:restaurantId", getRestaurantById);
router.delete("/:id", deleteRestaurant);
router.patch("/:id", updateRestaurant);

//<--RESTAURANTS AND MENU OPERATIONS-->//
router.post("/:restaurantId/menu", addMenu);
router.patch("/:restaurantId/menu/:menuId", editMenu);
router.delete("/:restaurantId/menu/:menuId", deleteMenu);
router.get("/:restaurantId/menu", getMenunInfo);

export default router;
