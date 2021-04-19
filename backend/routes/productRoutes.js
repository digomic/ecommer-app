import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Route home products
router.route("/").get(getProducts).post(protect, admin, createProduct);
//Route id Reviews
router.route("/:id/reviews").post(protect, createProductReview);
//Route top products
router.get("/top", getTopProducts);
//Route id Products
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
