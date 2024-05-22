import { useEffect } from "react";
import Headroom from "react-headroom";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLinks } from "../";
import defProfile from "../../Assets/Images/no_user.png";
import "./MainNav.css";
import { FiLogOut } from "react-icons/fi";

const MainNav = ({ profilePictureUrl, setAuthenticated, authenticated}) => {
    const navigate = useNavigate();
    useEffect(() => {
        let btn = document.querySelector(".logoutBtn");
        const handleLogout = () => {
            // Logic to handle logout
            setAuthenticated(false);
            // Clear authentication status and profile picture URL from local storage
            localStorage.removeItem('authenticated');
            navigate("/", { replace: true });
        };
        btn.addEventListener('click', handleLogout )
        return () => {
            btn.removeEventListener('click', handleLogout )
        }
    }, [setAuthenticated, authenticated, navigate])

    return (
        <div className="WebNav">
        <Headroom>
            <div className="WebNavContainer">
            <NavLink to="/Home" className="logoWrapper">
                AI HEALTH
            </NavLink>

            <NavLinks />

            <div className="profileLink">
                <button className="logoutBtn">
                    <FiLogOut />
                </button>
                <NavLink to="/Profile" className="navLi">
                <img src={profilePictureUrl || defProfile} alt="Profile" />
                </NavLink>
            </div>
            </div>
        </Headroom>
        </div>
    );
};

export default MainNav;
