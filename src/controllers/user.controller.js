import mongoose from "mongoose";
import User from "../models/user.model.js";
import { connectToDB } from "../database/mongoose.js";

export const createUser = async (req, res) => {
  await connectToDB();
  const user = req.body;
  console.log(user);

  try {
    const newUser = await User(user);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const getUsers = async (req, res) => {
  connectToDB();
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  connectToDB();
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No user with that id");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user, _id },
    { new: true }
  );

  res.json(updatedUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
