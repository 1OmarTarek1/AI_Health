import { useState, useEffect } from 'react';
import { FaFileLines, FaHeart } from 'react-icons/fa6';
import './CategoryCard.css';

const CategoryCard = (props) => {
    const { id, imageUrl, title, favorites, setFavorites, onMoreClick } = props;
    const isAlreadyLiked = favorites.some(card => card.id === id);
    const [liked, setLiked] = useState(isAlreadyLiked);

    useEffect(() => {
        // Check if the current card is liked when component mounts
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            const isLiked = parsedFavorites.some(card => card.id === id);
            setLiked(isLiked);
        }
    }, [id]);

    const handleLikeClick = () => {
        if (!liked) {
            // Save the liked card in localStorage
            const newFavorite = { id, imageUrl, title };
            const updatedFavorites = [...favorites, newFavorite];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            // Update state
            setFavorites(updatedFavorites);
            setLiked(true);
        } else {
            // Remove the liked card from localStorage
            const updatedFavorites = favorites.filter(card => card.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            // Update state
            setFavorites(updatedFavorites);
            setLiked(false);
        }
    };

    return (
        <div className="CategoryCard">
            <div className="cardHeader">
                <div className="cardImgWrapper">
                    <img src={imageUrl} alt={title} className="cardImg" loading="lazy" />
                </div>
                <div className="cardName">
                    {title}
                </div>
                <button className="moreBtn" onClick={() => onMoreClick(id)}>
                    <FaFileLines />
                </button>
                <button
                    className={liked ? "likeBtn likeBtnClicked" : "likeBtn"}
                    onClick={handleLikeClick}>
                    <FaHeart />
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
    );
};

export default CategoryCard;


