import { database } from "../db/Database.js";

export const findUserByEmail = async (email) => {

  try {

    const [rows] = await database.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0];

  } catch (error) {

    throw error;

  }

};