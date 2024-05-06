import { NavLink } from 'react-router-dom';
import './HomeSec.css'




const HomeSec = () => {
    return (
        <>
            <div className="homeSec" id='Home'>
                <div className="effect">
                    <div className="homeContent">
                        <div className="homeTitle">
                            AI HEALTH
                        </div>
                        <div className="dis">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <NavLink to="/ServicesPage" className="homeBtn">
                            <span>Start</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
        );
}

export default HomeSec