import express from "express";
import { getOrdersController, getOrderByIdController } from "../controller/OrderController.js";

const router = express.Router();

router.get("/orders", getOrdersController);
router.get("/orders/:id", getOrderByIdController);

export default router;