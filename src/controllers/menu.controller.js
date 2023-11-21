import Menu from "../models/menu.model.js";
import MenuItem from "../models/menuItem.model.js";
import { connectToDB } from "../database/mongoose.js";

export const addItem = async (req, res) => {
  connectToDB();

  const { menuId } = req.params;
  try {
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    const newItem = await MenuItem.create(req.body);

    console.log(menu);
    menu.items.push(newItem._id);
    await menu.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const editItem = async (req, res) => {
  connectToDB();

  try {
    const { menuId, itemId } = req.params;
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    const index = menu.items.indexOf(itemId);

    if (index === -1) {
      return res.status(404).json({ message: "Item do menu não encontrado" });
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getMenunInfo = async (req, res) => {
  connectToDB();

  try {
    const { menuId } = req.params;
    const menu = await Menu.findById(menuId).populate("items");

    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteItem = async (req, res) => {
  connectToDB();
  
  try {
    const { menuId, itemId } = req.params;
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({ message: "Menu não encontrado" });
    }

    const index = menu.items.indexOf(itemId);

    if (index === -1) {
      return res.status(404).json({ message: "Item do menu não encontrado" });
    }

    await MenuItem.findByIdAndDelete(itemId);
    menu.items.splice(index, 1);
    await menu.save();

    res.json({ message: "Item do menu excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
