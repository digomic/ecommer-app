import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Route Home
router.route("/").post(registerUser).get(protect, admin, getUsers);
//Route Login
router.post("/login", authUser);
//Route Perfile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//Route id User
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
