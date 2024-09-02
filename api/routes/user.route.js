import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"


const router = express.Router();


router.get("/", getAllUsers);
router.get("/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);



export default router;