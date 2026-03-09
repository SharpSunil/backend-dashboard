import { loginService } from "../services/AuthService.js";

export const loginController = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};