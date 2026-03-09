import React from 'react'
import "./sidebar.scss"
import { SiWelcometothejungle } from "react-icons/si";
import { MdOutlineDashboard } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar = ({ sidebarOpen }) => {
    return (
        <div className={`sidebar-parent ${sidebarOpen ? "open" : "close"}`}>

            <div className="logo-icon-group">
                <div className="icon-logo">
                    <SiWelcometothejungle />
                    <span>Admin Login</span>
                </div>
            </div>

            <div className="menu-group">
                <p className='menu'>MENU ITEMS</p>

                <div className="menu-list">

                    <div className="item1">
                        <Link to="/" className="icon">
                            <MdOutlineDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </div>

                    <div className="item2">
                        <Link to="/product" className="icon">
                            <MdProductionQuantityLimits />
                            <span>Products</span>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Sidebar