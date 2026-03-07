
import "./header.scss"
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { SiLivekit } from "react-icons/si";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdDisplaySettings } from "react-icons/md";
const Header = () => {
    return (
        <>
            <div className="header-parent parent">
                <div className="header-cont cont">
                    {/* logo with text */}
                    <div className="group1">
                        <div className="logo">Dashboard</div>
                    </div>
                    {/* search input */}
                    <div className="group2">
                        <input type="text" className="search-input" placeholder='Search reports ' />
                    </div>

                    {/* Different Tabs with icons  */}
                    <div className="group3">
                        <div className="tab">
                            <div className="icon"><MdOutlineHome /></div>
                            <span>Home</span>
                        </div>
                        <div className="tab">
                            <div className="icon"><MdOutlineAnalytics /></div>
                            <span>Analytics</span>
                        </div>
                        <div className="tab">
                            <div className="icon"><SiLivekit /></div>
                            <span>Live Monitoring</span>
                        </div>
                        <div className="tab">
                            <div className="icon"><MdOutlineSupportAgent /></div>
                            <span>support</span>
                        </div>
                        <div className="tab">
                            <div className="icon"><MdDisplaySettings /></div>
                            <span>Setting</span>
                        </div>
                    </div>
                    {/* profile and notification */}
                    <div className="group4">
                        <div className="message">
                            <div className="icon"></div>
                        </div>
                        <div className="notification">
                            <div className="icon"></div>
                        </div>
                        <div className="profile">
                            <div className="user-image"></div>
                            <div className="username">John Doe</div>
                            <div className="icon"></div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default Header
