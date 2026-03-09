import express from "express";
import { loginController, refreshTokenController } from "../controller/AuthController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/refresh", refreshTokenController);

export default router;