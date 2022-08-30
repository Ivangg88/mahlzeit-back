import express from "express";
import registerUser from "../controllers/userControllers";

const userRouters = express.Router();

userRouters.post("/register", registerUser);

export default userRouters;
