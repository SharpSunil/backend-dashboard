import { database } from "../db/Database.js";

/* GET ALL ORDERS */

export const getOrders = async () => {

  const [rows] = await database.query(`
    SELECT 
      id,
      orderId,
      customer,
      amount,
      currency,
      orderStatus,
      paymentStatus,
      items,
      createdAt
    FROM orders
    ORDER BY createdAt DESC
  `);

  return rows;

};


/* GET ORDER BY ID */

export const getOrderById = async (id) => {

  const [rows] = await database.query(
    `
    SELECT 
      id,
      orderId,
      customer,
      amount,
      currency,
      orderStatus,
      paymentStatus,
      items,
      createdAt
    FROM orders
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];

};


/* UPDATE ORDER STATUS */

export const updateOrderStatus = async (orderId, status) => {

  const [result] = await database.query(
    `
    UPDATE orders
    SET orderStatus = ?
    WHERE id = ?
    `,
    [status, orderId]
  );

  return result;

};


/* UPDATE PAYMENT STATUS */

export const updatePaymentStatus = async (orderId, paymentStatus) => {

  const [result] = await database.query(
    `
    UPDATE orders
    SET paymentStatus = ?
    WHERE id = ?
    `,
    [paymentStatus, orderId]
  );

  return result;

};


/* ADD ORDER NOTE */

export const addOrderNote = async (orderId, note) => {

  const [result] = await database.query(
    `
    INSERT INTO order_notes (orderId, note)
    VALUES (?, ?)
    `,
    [orderId, note]
  );

  return result;

};
export const getOrderAudit = async (orderId) => {
  const [rows] = await database.query(
    `SELECT 
      id, actorId, action, entityType, entityId, meta, timestamp
     FROM audit_logs
     WHERE entityType='order' AND entityId = ?
     ORDER BY timestamp DESC`,
    [orderId]
  );
  return rows;
};