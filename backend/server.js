import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";

//App config
const app = express(); 
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(cors());
app.use(express.json());

//endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart", cartRouter)
app.use('/api/orders', orderRouter)

app.get("/", (req, res) => {
  res.send("API is working");
});

//Listener
app.listen(port, () => console.log(`hey there, Server started on port ${port}`));