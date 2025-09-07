import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router()

router.get("/register",registerUser)