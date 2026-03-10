import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/auth/login`, form);

      const data = res.data;

      if (data.success) {

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        alert("Login Successful");

        navigate("/");

      } else {
        alert(data.message);
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error);
        alert("Server Error");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="login-parent">

      <form className="login-box" onSubmit={handleSubmit}>

        <h2>Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="password-field">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye />  : <FaEyeSlash />}
          </span>

        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>

  );

};

export default Login;