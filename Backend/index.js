import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

import { createAllTables } from "./tabels/Table.js";
import authRoutes from "./routes/AuthRoutes.js";
import { createConnection } from "./db/Database.js";
import orderRoutes from "./routes/OrderRoutes.js";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT

try {
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`server running on ${port}`)
    });

    await createConnection();
    await createAllTables();
   app.use("/api/auth", authRoutes);
   app.use("/api/admin", orderRoutes);
    console.log("erwerfew")
} catch (error) {
    console.log(error)
}


