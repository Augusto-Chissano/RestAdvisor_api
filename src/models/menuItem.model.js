import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
