import express from "express";

import {
    getOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
    updatePaymentStatusController,
    addOrderNoteController,
  getOrderAuditController
} from "../controller/OrderController.js";

const router = express.Router();


/* GET ALL ORDERS */

router.get("/orders", getOrdersController);


/* GET ORDER BY ID */

router.get("/orders/:id", getOrderByIdController);


/* UPDATE ORDER STATUS */

router.patch("/orders/:id/order-status", updateOrderStatusController);


/* UPDATE PAYMENT STATUS */

router.patch("/orders/:id/payment-status", updatePaymentStatusController);


/* ADD ORDER NOTE */

router.post("/orders/:id/notes", addOrderNoteController);
router.get("/orders/:id/audit", getOrderAuditController);

export default router;