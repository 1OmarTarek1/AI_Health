import axios from 'axios';
import React, { useState } from 'react';
import Headroom from "react-headroom";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLinks } from "../";
import { FiLogOut } from "react-icons/fi";
import defProfile from "../../Assets/Images/no_user.png";
import "./MainNav.css";

const MainNav = ({ profilePictureUrl, setAuthenticated, setUsername }) => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        try {
        const response = await axios.post('http://127.0.0.1:8000/getfit/logout/'); // Assuming your backend is hosted at '/logout'
        if (response.data.message === 'success') {
            document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            navigate("/", { replace: true });
            setAuthenticated(false);
            localStorage.removeItem('authenticated');
            setUsername('');
            localStorage.removeItem('username');
            setMessage('Logout successful');

        } else {
            setMessage('Logout failed');
        }
        } catch (error) {
        console.error('Logout error:', error);
        setMessage('Logout failed');
        }
    };


    return (
        <>        
            <div className="WebNav">
                <Headroom>
                    <div className="WebNavContainer">
                        <NavLink to="/Home" className="logoWrapper">
                            AI HEALTH
                        </NavLink>

                        <NavLinks />

                        <div className="profileLink">
                            <button className="logoutBtn" onClick={handleLogout}>
                                <FiLogOut />
                            </button>
                            <NavLink to="/Profile" className="navLi">
                                <img src={profilePictureUrl || defProfile} alt="Profile" />
                            </NavLink>
                        </div>
                    </div>
                </Headroom>
            </div>
            {message && <p>{message}</p>}
        </>
    );
};

export default MainNav;

