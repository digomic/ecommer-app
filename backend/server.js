import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

//call  the routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

//config environment variables
dotenv.config();

//Connection BD
connectDB();

//Call Express
const app = express();

//setting environment variables in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//use Middleware json
app.use(express.json());

//Connection with the route
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//Connection with the paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//Connection with the router Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//setting environment variables in Production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//Middleware for error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
