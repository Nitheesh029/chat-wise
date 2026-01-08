import express, { Router } from "express";
import {
    getLoggedInUser,
    loginUser,
    registerUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/me", authMiddleware, getLoggedInUser);

export default authRouter;
