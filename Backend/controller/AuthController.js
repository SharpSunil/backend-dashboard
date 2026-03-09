import { loginService, refreshTokenService } from "../services/AuthService.js";

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


export const refreshTokenController = async (req, res) => {

  try {

    const { refreshToken } = req.body;

    const result = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }

};