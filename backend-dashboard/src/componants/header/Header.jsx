import React, { useState } from 'react'
import { TbLayoutSidebarRight } from "react-icons/tb";
import img1 from "../../assets/user.png"
import "./header.scss"
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({ toggleSidebar }) => {

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="header-parent">

            <div className="icon" onClick={toggleSidebar}>
                <TbLayoutSidebarRight />
            </div>

            <div className="right-profile" onClick={() => setOpen(!open)}>
                <div className="profile-pic">
                    <img src={img1} alt="Profile" />
                </div>

                <div className="username">Admin</div>

                {open && (
                    <div className="open-box">
                        <div className="box-item">
                            <div className="icon-m">
                                <FaRegUser />
                                <span>Profile</span>
                            </div>
                        </div>

                        <div className="box-item">
                            <div className="icon-m">
                                <IoSettingsOutline />
                                <span>Settings</span>
                            </div>
                        </div>

                        <div className="box-item" onClick={handleLogout}>
                            <div className="icon-l">
                                <IoLogOutOutline />
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;