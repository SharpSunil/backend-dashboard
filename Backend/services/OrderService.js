import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  addOrderNote,
  getOrderAudit
} from "../models/OrderModel.js";


/* GET ALL ORDERS */

export const getOrdersService = async (query) => {

  const orders = await getOrders(query);

  return orders;

};


/* GET ORDER BY ID */

export const getOrderByIdService = async (id) => {

  const order = await getOrderById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;

};


/* UPDATE ORDER STATUS */
export const updateOrderStatusService = async (orderId, status) => {

  if (!status) {
    throw new Error("Order status is required");
  }

  const result = await updateOrderStatus(orderId, status);
  return result;

};



/* UPDATE PAYMENT STATUS */

export const updatePaymentStatusService = async (orderId, paymentStatus) => {

  if (!paymentStatus) {
    throw new Error("Payment status is required");
  }

  const result = await updatePaymentStatus(orderId, paymentStatus);

  return result;

};


/* ADD ORDER NOTE */

export const addOrderNoteService = async (orderId, note) => {

  if (!note) {
    throw new Error("Note is required");
  }

  const result = await addOrderNote(orderId, note);

  return result;

};

export const getOrderAuditService = async (orderId) => {
  const logs = await getOrderAudit(orderId);
  return logs;
};