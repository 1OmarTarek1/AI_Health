import { FaHome, FaUserCircle } from 'react-icons/fa'
import { FaCircleInfo, FaHandHoldingMedical, FaList, FaSquarePhone } from 'react-icons/fa6'
// import logo from '../../Assets/Images/logo.png'
import './WebNav.css'
import './MediaNav.css'



const WebNav = () => {
    return (
        <>
            <div className="WebNav">
                <div className="WebNavContainer">
                    <a href='#Home' className="logoWrapper">
                        {/* <img className='logoImg' src={logo} alt="Logo" /> */}
                        AI | HEALTH
                    </a>
                    <ul className='pageLinks'>
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
                                <FaList  />
                                <div className="linkText">
                                    Category
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#Contact" className='navLi'>
                                <FaSquarePhone />
                                <div className="linkText">
                                    Contact
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

            <div className="MediaWebNav">
                <div className="MediaNavContainer">
                    <ul className='MediaPageLinks'>
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
                </div>
            </div>

        </>
    ) 
}

export default WebNav