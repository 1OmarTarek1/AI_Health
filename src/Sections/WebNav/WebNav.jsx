import { FaHome, FaUserCircle } from 'react-icons/fa'
import { FaCircleInfo, FaHandHoldingMedical, FaSquarePhone } from 'react-icons/fa6'
import logo from '../../Assets/Images/logo.png'
import './WebNav.css'



const WebNav = () => {
    return (
        <>
            <div className="WebNav">
                <div className="WebNavContainer">
                    <a href='#!' className="logoWrapper">
                        <img className='logoImg' src={logo} alt="Logo" />
                    </a>
                    <ul>
                        <li>
                            <a href="#Home" className='navLi activeLiNav'>
                                <FaHome />
                                <div className="linkText">
                                    Home
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#Services" className='navLi'>
                                <FaHandHoldingMedical />
                                <div className="linkText">
                                    Services
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className='navLi'>
                                <FaSquarePhone />
                                <div className="linkText">
                                    Contact
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className='navLi'>
                                <FaCircleInfo />
                                <div className="linkText">
                                    Info
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="profileLink">
                        <a href="#!" className='navLi'>
                            <FaUserCircle />
                        </a>
                    </div>
                </div>
                
            </div>
        </>
    ) 
}

export default WebNav