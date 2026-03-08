import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { createConnection } from "./db/Database.js";
import { createAllTabels } from "./tabels/Table.js";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT

try {
    const server = http.createServer(app);

    server.listen(port, ()=>{
        console.log(`server running on ${port}`)
    });

    await createConnection();
    await createAllTabels();
    console.log("erwerfew")
} catch (error) {
    console.log(error)
}

