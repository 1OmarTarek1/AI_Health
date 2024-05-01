import { NavLink } from "react-router-dom";
import { FaHome, FaUserCircle } from 'react-icons/fa'
import { FaHandHoldingMedical, FaList, FaSquarePhone } from 'react-icons/fa6'
import './MainNav.css'





const MainNav = () => {
    return (
        <>
            <div className="WebNav">
                <div className="WebNavContainer">
                    <NavLink to='/' className="logoWrapper">
                        {/* <img className='logoImg' src={logo} alt="Logo" /> */}
                        AI | HEALTH
                    </NavLink>
                    <ul className='pageLinks'>
                        <li>
                            <NavLink to="/" className='navLi'>
                                <FaHome />
                                <div className="linkText">
                                    Home
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Services" className='navLi'>
                                <FaHandHoldingMedical />
                                <div className="linkText">
                                    Services
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Category" className='navLi'>
                                <FaList  />
                                <div className="linkText">
                                    Category
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Contact" className='navLi'>
                                <FaSquarePhone />
                                <div className="linkText">
                                    Contact
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="profileLink">
                        <NavLink to="/Profile" className='navLi'>
                            <FaUserCircle />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainNav