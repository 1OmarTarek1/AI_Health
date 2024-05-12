import { FaFireAlt } from "react-icons/fa";
import { FaDumbbell, FaRadiation, FaShieldHalved } from 'react-icons/fa6';
import './CategoryCard.css'






const CategoryCard = ( props ) => {

    return (
        <>
            <div className="CategoryCard">
                <div className="cardHeader">
                    <div className="cardImgWrapper">
                        <img src={props.imageUrl} alt={"props.name"} className="cardImg" loading="lazy" />
                    </div>
                    <div className="cardName">
                        { props.title }
                    </div>
                </div>
                <div className="cardBody">
                    <p>
                        { props.title }{ props.title }{ props.title }
                        { props.title }{ props.title }{ props.title }
                        { props.title }{ props.title }{ props.title }
                        { props.title }{ props.title }{ props.title }
                    </p>
                    <ul className="foodDetails">
                        <li className="detailItem">
                            <div className="miniTitle">
                                <FaFireAlt style={{color:"Red"}} />
                                <span>Calories</span>
                            </div>
                            <div className="titleInfo">
                                {props.calories}
                            </div>
                        </li>
                        <li className="detailItem">
                            <div className="miniTitle">
                                <FaDumbbell style={{color:"silver"}} />
                                <span>Protein</span>
                            </div>
                            <div className="titleInfo">
                                {props.protein}
                            </div>
                        </li>
                        <li className="detailItem">
                            <div className="miniTitle">
                                <FaRadiation style={{color:"yellow"}} /> 
                                <span>Fats</span>
                            </div>
                            <div className="titleInfo">
                                {props.fats}
                            </div>
                        </li>
                        <li className="detailItem">
                            <div className="miniTitle">
                                <FaShieldHalved style={{color:"lightGreen"}}/>
                                <span>Healthy</span>
                            </div>
                            <div className="titleInfo">
                                {props.healOpj}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CategoryCard