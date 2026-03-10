import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Product from "./Pages/product/Product";
import Order from "./Pages/Orders/Order";
import "./App.scss"
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import Login from "./Pages/login/login";

function App() {

  const [active, setActive] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard active={active} setActive={setActive} />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product active={active} setActive={setActive} />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Order active={active} setActive={setActive} />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;