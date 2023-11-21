import mongoose from "mongoose";

const orderRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ["Pendente", "Em Andamento", "Concluído"],
    default: "Pendente",
  },
});

const OrderRequest = mongoose.models.OrderRequest || mongoose.model("OrderRequest", orderRequestSchema);

export default OrderRequest;
