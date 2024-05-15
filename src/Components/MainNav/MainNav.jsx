import Headroom from "react-headroom";
import { NavLink } from "react-router-dom";
import { FaHome } from 'react-icons/fa'
import { FaHandHoldingMedical, FaList, FaSquarePhone } from 'react-icons/fa6'
import defProfile from '../../Assets/Images/no_user.png'
import './MainNav.css'





const MainNav = ({ profilePictureUrl }) => {

    return (
        <>
                <div className="WebNav">
                <Headroom>
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
                                <NavLink to="/ServicesPage" className='navLi'>
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
                                <img src={ profilePictureUrl || defProfile } alt="Profile" />
                            </NavLink>
                        </div>
                    </div>
                </Headroom>
                </div>
        </>
    )
}

export default MainNav