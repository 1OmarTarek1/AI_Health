import { NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { FaHandHoldingMedical, FaList, FaSquarePhone } from 'react-icons/fa6'
import './NavLinks.css'







const NavLinks = () => {
    return (
        <>
            <ul className='pageLinks'>
                <li>
                    <NavLink to="/Home" className='navLi'>
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
        </>
    )
}

export default NavLinks