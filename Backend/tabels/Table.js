import { database } from "../db/Database.js";

const User = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREAMENT NOT NULL,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
role ENUM('admin','viewer') NOT NULL,
createdAT TIMESTAMP NOT NULL
)`;

const order = ` CREATE TABLE IF NOT EXISTS orders(
id INT AUTO_INCREAMENT NOT NULL,
orderId VARCHAR(255) NOT NULL,
customer JSON NOT NULL,
amount INT NOT NULL,
currency VARCHAR(100) DEFUALT 'INR',
orderStatus ENUM('pending','confirmed', 'cancelled', 'deliverd') DEFAULT 'pending',
paymentStatus ENUM('pending','captured','paid','failed') DEFAULT 'pending',
items JSON NOT NULL,
createdAT TIMESTAMP NOT NULL
)`;

const payment = `CREATE TABLE IF NOT EXISTS payment(
orderId VARCHAR(255) NOT NULL,
method ENUM('CASH','UPI','CARD') NOT NULL,
gatewayRef VARCHAR(255) NOT NULL,
status ENUM('pending','captured','paid','failed') 'pending',
createdAT TIMESTAMP NOT NULL
)`;

const createTable = async (query, tablename) => {
  try {
    await database.query(query);
    console.log(`${tablename} create successfully`);
  } catch (error) {
    console.log(error);
  }
};

export const createAllTabels = async () => {
  await createTable(User, "users");
  await createTable(order, "orders");
  await createTable(payment, "payment");

};
