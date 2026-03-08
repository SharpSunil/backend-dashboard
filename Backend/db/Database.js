import mysql from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config()

export const database = mysql.createPool({
    user: process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});


export const createConnection = async ()=>{
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