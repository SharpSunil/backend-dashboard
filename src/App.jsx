import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'

import Dashboard from './Pages/dashboard/Dashboard'
import Product from './Pages/product/Product'

import { useState } from 'react'
import Order from './Pages/Orders/Order'

function App() {
  const [active, setActive] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route 
          path="/" 
          element={<Dashboard active={active} setActive={setActive} />} 
        />

        {/* Orders Page */}
        <Route 
          path="/product" 
          element={<Product active={active} setActive={setActive} />} 
        />

        {/* Order Details Page */}
        <Route 
          path="/product/:id" 
          element={<Order active={active} setActive={setActive} />} 
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App