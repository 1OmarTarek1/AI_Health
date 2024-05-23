// import { FaFireAlt } from "react-icons/fa";
// import { FaDumbbell, FaRadiation, FaShieldHalved } from 'react-icons/fa6';
import { FaFileLines } from 'react-icons/fa6';
import './CategoryCard.css'

const CategoryCard = (props) => {

    const handleClick = () => {
        if (props.onClick) {
            props.onClick(); // Call the onClick function if it's provided
        }
    };

    return (
        <div className="CategoryCard"> {/* Add onClick handler here */}
            <div className="cardHeader">
                <div className="cardImgWrapper">
                    <img src={props.imageUrl} alt={"props.name"} className="cardImg" loading="lazy" />
                </div>
                <div className="cardName">
                    {props.title}
                </div>
                <button className="moreBtn" onClick={handleClick}>
                    <FaFileLines />
                </button>
            </div>
            <div className="cardBody">
                <ul className="foodDetails">
                    <li className="detailItem">
                        <div className="miniTitle">
                            <span>Calories</span>
                        </div>
                        <div className="titleInfo">
                            {props.calories}
                        </div>
                    </li>
                    <li className="detailItem">
                        <div className="miniTitle">
                            <span>Protein</span>
                        </div>
                        <div className="titleInfo">
                            {props.protein}
                        </div>
                    </li>
                    <li className="detailItem">
                        <div className="miniTitle">
                            <span>Fats</span>
                        </div>
                        <div className="titleInfo">
                            {props.fats}
                        </div>
                    </li>
                    <li className="detailItem">
                        <div className="miniTitle">
                            <span>Healthy</span>
                        </div>
                        <div className="titleInfo">
                            {props.healOpj}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryCard;
