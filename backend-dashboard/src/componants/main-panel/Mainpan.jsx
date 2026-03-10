import React from 'react'
import "./main_panel.scss"
import Sidebar from '../sidebar/Sidebar'
const Mainpan = ({ children, active, setActive }) => {
  return (
    <>
      <div className="main-pan-parent">
        <div className={active ? "sidebar active" : "sidebar"}>

          <Sidebar setActive={setActive} />
        </div>
        <div className={active ? "main-right active" : "main-right"}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Mainpan
