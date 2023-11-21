import mongoose from "mongoose";
import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";
import { connectToDB } from "../database/mongoose.js";

//<--RESTAURANTS OPERATIONS ONLY-->//
export const createRestaurant = async (req, res) => {
  connectToDB();

  const image = req.file.filename;
  const restaurant = { ...req.body, image: image };
  try {
    const newRestaurant = await Restaurant(restaurant);

    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

export const getRestaurants = async (req, res) => {
  connectToDB();
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteRestaurant = async (req, res) => {
  connectToDB();

  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).send("No restaurant with that id");

    await Restaurant.findByIdAndDelete(id);

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

export const updateRestaurant = async (req, res) => {
  connectToDB();
  const { id: _id } = req.params;
  const restaurant = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No restaurant with that id");

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    _id,
    { ...restaurant, _id },
    { new: true }
  );

  res.json(updatedRestaurant);
};

//<--RESTAURANTS AND MENU OPERATIONS-->//
export const addMenu = async (req, res) => {
  connectToDB();

  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }

    const newMenu = await Menu.create(req.body);
    restaurant.menu.push(newMenu._id);
    await restaurant.save();

    res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const editMenu = async (req, res) => {
  connectToDB();

  const { restaurantId, menuId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }

    const menu = await Menu.findByIdAndUpdate(menuId, req.body, { new: true });
    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteMenu = async (req, res) => {
  connectToDB();

  const { restaurantId, menuId } = req.params;
  console.log(req.params);
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }

    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    // Removendo a referência do menu no restaurante
    restaurant.menu.pull(menuId);

    await restaurant.save();

    res.json({ message: "Menu excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getMenunInfo = async (req, res) => {
  connectToDB();

  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId).populate("menu");
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }

    res.json(restaurant.menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


