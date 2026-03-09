import { getOrders, getOrderById } from "../models/OrderModel.js";

/* ================= GET ALL ORDERS ================= */

export const getOrdersService = async (query) => {

  try {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filters = {
      search: query.search || "",
      paymentStatus: query.paymentStatus || "",
      orderStatus: query.orderStatus || "",
      startDate: query.startDate || "",
      endDate: query.endDate || "",
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder || "DESC",
      limit,
      offset: (page - 1) * limit
    };

    const orders = await getOrders(filters);

    return orders;

  } catch (error) {
    throw error;
  }

};


/* ================= GET ORDER BY ID ================= */

export const getOrderByIdService = async (id) => {

  try {

    const order = await getOrderById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;

  } catch (error) {
    throw error;
  }

};