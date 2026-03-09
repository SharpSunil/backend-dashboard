import { database } from "../db/Database.js";
import bcrypt from "bcrypt";

/* ================= USERS TABLE ================= */

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
passwordHash VARCHAR(255) NOT NULL,
role ENUM('admin','viewer') DEFAULT 'viewer',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

/* ================= ORDERS TABLE ================= */

const ordersTable = `
CREATE TABLE IF NOT EXISTS orders (
id INT AUTO_INCREMENT PRIMARY KEY,
orderId VARCHAR(255) NOT NULL,
customer JSON NOT NULL,
amount DECIMAL(10,2) NOT NULL,
currency VARCHAR(10) DEFAULT 'INR',
orderStatus ENUM('pending','confirmed','cancelled','delivered') DEFAULT 'pending',
paymentStatus ENUM('pending','captured','paid','failed') DEFAULT 'pending',
items JSON NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

/* ================= PAYMENTS TABLE ================= */

const paymentsTable = `
CREATE TABLE IF NOT EXISTS payments (
id INT AUTO_INCREMENT PRIMARY KEY,
orderId VARCHAR(255) NOT NULL,
method ENUM('CASH','UPI','CARD') NOT NULL,
gatewayRef VARCHAR(255),
status ENUM('pending','captured','paid','failed') DEFAULT 'pending',
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

/* ================= AUDIT LOG TABLE ================= */

const auditTable = `
CREATE TABLE IF NOT EXISTS audit_logs (
id INT AUTO_INCREMENT PRIMARY KEY,
actorId INT,
action VARCHAR(255),
entityType VARCHAR(50),
entityId VARCHAR(255),
meta JSON,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

/* ================= GENERIC TABLE CREATOR ================= */

const createTable = async (query, tableName) => {
  try {

    await database.query(query);

    console.log(`${tableName} table created successfully`);

  } catch (error) {

    console.log(`Error creating ${tableName}`, error);

  }
};

/* ================= DEFAULT ADMIN ================= */

const createDefaultAdmin = async () => {

  try {

    const [rows] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (rows.length === 0) {

      const hashedPassword = await bcrypt.hash("123456", 10);

      await database.query(
        "INSERT INTO users (name,email,passwordHash,role) VALUES (?,?,?,?)",
        ["Admin", "admin@gmail.com", hashedPassword, "admin"]
      );

      console.log("Default admin created");

    } else {

      console.log("Admin user already exists");

    }

  } catch (error) {

    console.log("Error creating default admin", error);

  }

};

/* ================= MAIN FUNCTION ================= */

export const createAllTables = async () => {

  try {

    await createTable(usersTable, "users");

    await createTable(ordersTable, "orders");

    await createTable(paymentsTable, "payments");

    await createTable(auditTable, "audit_logs");

    await createDefaultAdmin();

    console.log("All tables created successfully");

  } catch (error) {

    console.log("Error creating tables", error);

  }
};