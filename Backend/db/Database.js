import mysql from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config()

export const database = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


export const createConnection = async () => {
    let connection;
    try {
        connection = database.getConnection();

        console.log("database connected");

        (await connection).commit()
    } catch (error) {
        console.log(error)
            (await connection).release()
    }
}