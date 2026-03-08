import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/UserModel.js";


export const registerService = async (name,email,password) => {

    const user = await findUserByEmail(email);

    if(user){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await createUser(name,email,hashedPassword);

    return {message:"User registered successfully"};

};

export const loginService = async (email,password) => {

    const user = await findUserByEmail(email);

    if(!user){
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    return {
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    };
};