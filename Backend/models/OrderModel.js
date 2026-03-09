import { database } from "../db/Database.js";

export const getOrders = async (filters) => {

  try {

    let query = `SELECT * FROM orders WHERE 1=1`;
    let params = [];

    /* SEARCH */
    if (filters.search) {
      query += ` AND (orderId LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(customer,'$.email')) LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    /* PAYMENT STATUS FILTER */
    if (filters.paymentStatus) {
      query += ` AND paymentStatus = ?`;
      params.push(filters.paymentStatus);
    }

    /* ORDER STATUS FILTER */
    if (filters.orderStatus) {
      query += ` AND orderStatus = ?`;
      params.push(filters.orderStatus);
    }

    /* DATE RANGE FILTER */
    if (filters.startDate && filters.endDate) {
      query += ` AND createdAt BETWEEN ? AND ?`;
      params.push(filters.startDate, filters.endDate);
    }

    /* SORTING */
    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = filters.sortOrder || "DESC";

    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    /* PAGINATION */
    query += ` LIMIT ? OFFSET ?`;

    params.push(Number(filters.limit), Number(filters.offset));

    const [rows] = await database.query(query, params);

    return rows;

  } catch (error) {
    throw error;
  }

};


/* GET SINGLE ORDER BY ID */

export const getOrderById = async (id) => {

  try {

    const query = `SELECT * FROM orders WHERE id = ?`;

    const [rows] = await database.query(query, [id]);

    return rows[0];

  } catch (error) {
    throw error;
  }

};