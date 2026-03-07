

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './componants/header/Header'


function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
