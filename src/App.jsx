

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Sidebar from './componants/header/sidebar/Sidebar'
import Dashboard from './Pages/dashboard/Dashboard'
import { useState } from 'react'
// import Header from './componants/header/Header'


function App() {
const [active, setActive] = useState(false);

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        
        <Routes>
          <Route path="/" element={<Dashboard  active={active} setActive={setActive}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
