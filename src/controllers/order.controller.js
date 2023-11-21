import mongoose from "mongoose";
import { connectToDB } from "../database/mongoose.js";
import OrderRequest from "../models/orderRequest.model.js";

export const createOrder = async (req, res) => {
  connectToDB();

  try {
    const newOrderRequest = await OrderRequest.create(req.body);

    res.status(201).json(newOrderRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateOrder = async (req, res) => {
  connectToDB();

  try {
    const { orderId } = req.params;
    const updatedOrderRequest = await OrderRequest.findByIdAndUpdate(
      orderId,
      { status: "Concluído" },
      { new: true }
    );
    res.json(updatedOrderRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteOrder = async (req, res) => {
  connectToDB();

  try {
    const { orderId } = req.params;
    await OrderRequest.findByIdAndDelete(orderId);

    res.json({ message: "Solicitação de produto excluída com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getUserOrders = async (req, res) => {
  connectToDB();

  try {
    const { userId } = req.params;
    const orders = await OrderRequest.find({ user: userId }).populate(
      "restaurant menu item"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getAllOrders = async (req, res) => {
  connectToDB();

  try {
    const orders = await OrderRequest.find().populate(
      "user restaurant menu item"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
