import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/UserModel.js";

export const loginService = async (email, password) => {

  try {

    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };

  } catch (error) {
    throw error;
  }

};