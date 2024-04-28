import { SectionWrapper } from '../../Components'
// import slick_1 from '../../Assets/Images/Food-1.jpg'
// import slick_2 from '../../Assets/Images/Food-2.jpg'
import slick_3 from '../../Assets/Images/Food-3.jpg'
// import slick_4 from '../../Assets/Images/Food-4.jpg'


import './HomeSec.css'




const HomeSec = () => {
    return (
        <>
            <div className="homeSec" id='Home'>
            <SectionWrapper>
                <div className="imgWrapper">
                    <img src={slick_3} alt="..." />
                </div>
                <div className="effect">
                    <div className="homeContent">
                        <div className="homeTitle">
                            AI HEALTH
                        </div>
                        <div className="dis">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <a href="#Services" className="homeBtn">
                            <span>Start</span>
                        </a>
                    </div>
                </div>
            </SectionWrapper>
            </div>
        </>
        );
}

export default HomeSec