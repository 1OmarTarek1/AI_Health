import { NavLink } from "react-router-dom";
import { FaHome } from 'react-icons/fa'
import { FaHandHoldingMedical, FaList, FaSquarePhone } from 'react-icons/fa6'
import './TabletNav.css'







const TabletNav = () => {
    return (
        <>
            <div className="MediaWebNav">
                <div className="MediaNavContainer">
                    <ul className='MediaPageLinks'>
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
                </div>
            </div>
        </>
    )
}

export default TabletNav