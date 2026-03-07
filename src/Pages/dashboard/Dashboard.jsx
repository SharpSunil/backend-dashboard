import React from 'react'
import "./dashboard.scss"
import Main_pan from '../../componants/main-panel/main_pan'

const Dashboard = (props) => {
  return (
    <>
  <Main_pan active={props.active} setActive={props.setActive}>
<div className="dash ">
    
    
</div>
  </Main_pan>
    </>
  )
}

export default Dashboard
