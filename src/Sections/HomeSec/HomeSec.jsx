import { NavLink } from 'react-router-dom';
import './HomeSec.css'




const HomeSec = () => {
    return (
        <>
            <div className="homeSec" id='Home'>
                <div className="effect">
                    <div className="homeContent">
                        <div className="homeTitle" data-aos="zoom-out">
                            GET FIT
                        </div>
                        <div className="dis" data-aos="zoom-out">
                        For a healthier tomorrow, start today. Welcome to GET FIT, where every choice fuels your journey to wellness.
                        </div>
                        <NavLink to="/ServicesPage" className="homeBtn" data-aos="zoom-out">
                            <span>Start</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
        );
}

export default HomeSec