import { registerService, loginService } from "../services/AuthService.js";

export const register = async (req,res) => {
    try{

        const {name,email,password} = req.body;

        const result = await registerService(name,email,password);

        res.status(201).json(result);

    }catch(error){
        res.status(400).json({message:error.message});
    }
};

export const login = async (req,res) => {

    try{

        const {email,password} = req.body;

        const result = await loginService(email,password);

        res.status(200).json(result);

    }catch(error){
        res.status(400).json({message:error.message});
    }

};