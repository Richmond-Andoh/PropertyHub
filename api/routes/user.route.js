import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = express.Router();


router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);



export default router;