import { database } from "../db/Database.js";

const User = `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
role ENUM('admin','viewer') NOT NULL,
createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const order = `CREATE TABLE IF NOT EXISTS orders (
id INT AUTO_INCREMENT PRIMARY KEY,
orderId VARCHAR(255) NOT NULL,
customer JSON NOT NULL,
amount INT NOT NULL,
currency VARCHAR(100) DEFAULT 'INR',
orderStatus ENUM('pending','confirmed','cancelled','delivered') DEFAULT 'pending',
paymentStatus ENUM('pending','captured','paid','failed') DEFAULT 'pending',
items JSON NOT NULL,
createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const payment = `CREATE TABLE IF NOT EXISTS payment (
id INT AUTO_INCREMENT PRIMARY KEY,
orderId VARCHAR(255) NOT NULL,
method ENUM('CASH','UPI','CARD') NOT NULL,
gatewayRef VARCHAR(255) NOT NULL,
status ENUM('pending','captured','paid','failed') DEFAULT 'pending',
createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createTable = async (query, tablename) => {
  try {
    await database.query(query);
    console.log(`${tablename} created successfully`);
  } catch (error) {
    console.log(error);
  }
};

// Create default admin
const createDefaultAdmin = async () => {
  try {
    const [rows] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (rows.length === 0) {
      await database.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        ["Admin", "admin@gmail.com", "123456", "admin"]
      );

      console.log("Default admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createAllTables = async () => {
  await createTable(User, "users");
  await createTable(order, "orders");
  await createTable(payment, "payment");

  await createDefaultAdmin();
};