import { database } from "./db/Database.js";
import bcrypt from "bcrypt";

const seedDatabase = async () => {

  try {

    console.log("Starting database seed...");

    /* ================= CREATE USERS ================= */

    const adminEmail = "admin@gmail.com";
    const viewerEmail = "viewer@gmail.com";

    const [adminUser] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [adminEmail]
    );

    if (adminUser.length === 0) {

      const adminPassword = await bcrypt.hash("123456", 10);

      await database.query(
        `INSERT INTO users (name,email,passwordHash,role)
         VALUES (?,?,?,?)`,
        ["Admin", adminEmail, adminPassword, "admin"]
      );

      console.log("Admin user created");

    } else {

      console.log("Admin already exists");

    }


    const [viewerUser] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [viewerEmail]
    );

    if (viewerUser.length === 0) {

      const viewerPassword = await bcrypt.hash("123456", 10);

      await database.query(
        `INSERT INTO users (name,email,passwordHash,role)
         VALUES (?,?,?,?)`,
        ["Viewer User", viewerEmail, viewerPassword, "viewer"]
      );

      console.log("Viewer user created");

    } else {

      console.log("Viewer already exists");

    }


    /* ================= CREATE DEMO ORDER ================= */

    const orderId = "ORD1001";

    const [orderCheck] = await database.query(
      "SELECT * FROM orders WHERE orderId = ?",
      [orderId]
    );

    if (orderCheck.length === 0) {

      const customer1 = JSON.stringify({
        name: "Sunil Shelke",
        email: "sunil@gmail.com",
        phone: "9876543210"
      });

      const items = JSON.stringify([
        {
          name: "Paper Cup",
          quantity: 2,
          price: 200
        },
        {
          name: "Rigid Box",
          quantity: 1,
          price: 500
        }
      ]);

      await database.query(
        `INSERT INTO orders 
        (orderId,customer,amount,orderStatus,paymentMethod,paymentStatus,items)
        VALUES (?,?,?,?,?,?,?)`,
        [
          orderId,
          customer1,
          900,
          "confirmed",
          "UPI",
          "captured",
          items
        ]
      );

      console.log("Demo order inserted");

    } else {

      console.log("Order already exists");

    }


    console.log("Database seed completed successfully");

    process.exit();

  } catch (error) {

    console.log("Seed error:", error);

    process.exit(1);

  }

};

seedDatabase();