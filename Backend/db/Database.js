import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const createConnection = async () => {
  try {
    const connection = await database.getConnection();

    console.log("Database connected successfully");

    connection.release(); // return connection to pool
  } catch (error) {
    console.error("Database connection error:", error);
  }
};