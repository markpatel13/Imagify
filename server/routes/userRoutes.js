import express from "express";
import {registerUser,loginUser} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;

//http://localhost:5173//api/user/register
//http://localhost:5173//api/user/login