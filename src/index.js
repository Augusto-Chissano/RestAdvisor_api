import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDB } from "./database/mongoose.js";
import userRoutes from "./routes/user.route.js"
import restaurantRoutes from "./routes/restaurant.route.js"
import menuRoutes from "./routes/menu.route.js"
import orderRequestRoutes from "./routes/order.route.js";

dotenv.config();
connectToDB();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//<-----ROUTES----->//
//FILES ROUTE (IMAGES)
app.use('/restadvisor/uploads', express.static('src/uploads'))

//MAIN ROUTES
app.get("/", (req, res) => {
  res.send("Hello, welcome to RESTADVISOR API");
});

app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRequestRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
