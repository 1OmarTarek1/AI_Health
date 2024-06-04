import React, { useState, useEffect } from 'react';
import { FaFileLines, FaHeart } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import './CategoryCard.css';
import dsda from '../../../Assets/Images/Food-1.jpg';

const CategoryCard = ({
    id,
    title = 'No Title',
    imageUrl = '',
    calories = 0,
    protein = 0,
    fats = 0,
    carbs = 0,
    likes = [],
    onMoreClick = () => {},
    onLikeClick = () => {},
    likeBtn, // Received as a prop
}) => {
    const [likesCount, setLikesCount] = useState(likes.length);

    // Effect to update likes count when likes prop changes
    useEffect(() => {
        setLikesCount(likes.length);
    }, [likes]);

    // Handler for like button click
    const handleLikeClick = () => {
        setLikesCount(likeBtn ? likesCount - 1 : likesCount + 1); // Increment or decrement the likes count
        onLikeClick(id); // Pass the id prop to the onLikeClick function
    };

    return (
        <div className="CategoryCard">
            <div className="cardHeader">
                <div className="cardImgWrapper">
                    <img src={dsda} alt={title} className="cardImg" loading="lazy" />
                </div>
                <div className="cardName">
                    {title}
                </div>
                <button className="moreBtn" onClick={() => onMoreClick(id)}>
                    <FaFileLines />
                </button>
                <button
                    className={likeBtn ? "likeBtn likeBtnClicked" : "likeBtn"}
                    onClick={handleLikeClick}
                >
                    <FaHeart />
                    <span style={{color:"#fff", fontWeight:"700", fontSize:"11px", position:"absolute", top:"57%", left:"48%",transform:"translate(-50%, -50%)"}}>
                        {likesCount === 0 ? null : likesCount }
                    </span>
                </button>
            </div>
            <div className="cardBody">
                <ul className="foodDetails">
                    <li className="detailItem">
                        {/* <div className="miniTitle">
                            <span>Calories</span>
                        </div> */}
                        <div className="titleInfo">
                            {calories}cal
                        </div>
                    </li>
                    <li className="detailItem">
                        {/* <div className="miniTitle">
                            <span>Protein</span>
                        </div> */}
                        <div className="titleInfo">
                            {protein}pro
                        </div>
                    </li>
                    <li className="detailItem">
                        {/* <div className="miniTitle">
                            <span>Fats</span>
                        </div> */}
                        <div className="titleInfo">
                            {fats}fts
                        </div>
                    </li>
                    <li className="detailItem">
                        {/* <div className="miniTitle">
                            <span>Carbs</span>
                        </div> */}
                        <div className="titleInfo">
                            {carbs}crb
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    calories: PropTypes.number,
    protein: PropTypes.number,
    fats: PropTypes.number,
    carbs: PropTypes.number,
    onMoreClick: PropTypes.func,
    onLikeClick: PropTypes.func,
    likes: PropTypes.array,
    likeBtn: PropTypes.bool, // Define the prop type for likeBtn
};

export default CategoryCard;
