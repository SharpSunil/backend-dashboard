import { database } from "../db/Database.js";


export const findUserByEmail = async (email) => {
    const [rows] = await database.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
};

export const createUser = async (name, email, password) => {
    const [result] = await database.query(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name,email,password]
    );
    return result;
};
