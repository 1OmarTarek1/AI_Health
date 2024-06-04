import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CategoryCard, SectionWrapper, CategorySearch, FoodDetailsCard } from '../../Components';
import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import './Favourites.css';

const Favourites = ({ favorites, setFavorites, likedCategories, setLikedCategories }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFood, setSelectedFood] = useState(null);


    useEffect(() => {
        const userId = localStorage.getItem('userID');
        
        // Load liked states from localStorage
        const savedLikedCategories = JSON.parse(localStorage.getItem('likedCategories')) || {};
        setLikedCategories(savedLikedCategories);

        axios.get(`http://127.0.0.1:8000/getfit/user/${userId}/liked_foods/`)
            .then(response => {
                const fetchedFavorites = response.data;
                setFavorites(fetchedFavorites);

                // Initialize liked states based on the fetched favorites
                const initialLikedStates = { ...savedLikedCategories };
                fetchedFavorites.forEach(food => {
                    if (initialLikedStates[food.id] === undefined) {
                        initialLikedStates[food.id] = true; // assuming fetched favorites are liked
                    }
                });
                setLikedCategories(initialLikedStates);
                localStorage.setItem('likedCategories', JSON.stringify(initialLikedStates));
            })
            .catch(error => {
                console.error('Error fetching liked foods:', error);
            });
    }, [setFavorites, setLikedCategories]);

    const handleDeleteAll = () => {
        const userId = localStorage.getItem('userID');

        axios.post(`http://127.0.0.1:8000/getfit/delete-user-likes/${userId}/`)
            .then(response => {
                setFavorites([]); // Clear the favorites array
                setLikedCategories({});
                localStorage.removeItem('likedCategories');
            })
            .catch(error => {
                console.error('Error deleting all liked foods:', error);
            });
    };
    
    const handleLikeClick = (id) => {
        const userId = localStorage.getItem('userID');
        axios.post(`http://127.0.0.1:8000/getfit/foods-like/${id}/${userId}/`)
            .then(response => {
                setLikedCategories(prevLikedCategories => {
                    const updatedLikedCategories = {
                        ...prevLikedCategories,
                        [id]: !prevLikedCategories[id]
                    };
                    localStorage.setItem('likedCategories', JSON.stringify(updatedLikedCategories));
                    return updatedLikedCategories;
                });

                if (response.data.message === 'You have unliked this food.') {
                    setFavorites(prevFavorites =>
                        prevFavorites.filter(food => food.id !== id)
                    );
                } else if (response.data.message === 'You have liked this food.') {
                    // If the food was not already in favorites, fetch it and add to favorites
                    axios.get(`http://127.0.0.1:8000/getfit/food/${id}/`)
                        .then(response => {
                            const likedFood = response.data;
                            setFavorites(prevFavorites => [...prevFavorites, likedFood]);
                        })
                        .catch(error => {
                            console.error('Error fetching liked food:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error liking food:', error);
            });
    };

    const handleMoreClick = (id) => {
        const selectedFood = favorites.find(favoriteCard => favoriteCard.id === id);
        setSelectedFood(selectedFood);
    };

    const filteredFavorites = favorites.filter(food =>
        food.FoodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <div className="Favourites">
                <div className="CatHeaderContainer">
                    <div className="CatHeaderItem categoryCardsHeader">
                        <div className="HeaderTitle">
                            <FaHeart />
                            <span>Favourites</span>
                        </div>
                        <CategorySearch onSearch={handleSearchChange}/>
                    </div>
                </div>
                <SectionWrapper>
                    <div className="favoriteCards">
                        {favorites.length > 0 ? (
                            filteredFavorites.length > 0 ? (
                                filteredFavorites.map(food => (
                                    <CategoryCard
                                        key={food.id}
                                        id={food.id}
                                        title={food.FoodName}
                                        imageUrl={food.imageUrl}
                                        calories={food.Calories}
                                        protein={food.Protein}
                                        fats={food.Fats}
                                        carbs={food.Carbs}
                                        likes={food.likes}
                                        onLikeClick={() => handleLikeClick(food.id)} // Pass the like click handler
                                        likeBtn={likedCategories[food.id] || false} // Pass the actual liked state of each food item
                                        onMoreClick={() => handleMoreClick(food.id)} // Pass the more click handler
                                    />
                                ))
                            ) : (
                                <p>No results found for "{searchQuery}".</p>
                            )
                        ) : (
                            <p>No food added yet.</p>
                        )}
                    </div>
                    {favorites.length > 0 && (
                        <button className="clearBtn" onClick={handleDeleteAll}>
                            <FaTrashAlt /> Delete All
                        </button>
                    )}
                </SectionWrapper>
            </div>
            {selectedFood && (
                <FoodDetailsCard 
                food={selectedFood} 
                onClose={() => setSelectedFood(null)}  
                likeBtn={likedCategories[selectedFood.id] || false} // Pass likeBtn as a prop
                onLikeClick={handleLikeClick} // Pass onLikeClick as a prop
                id={selectedFood.id} // Pass id as a prop
                handleLikeClick={handleLikeClick}
                />
            )}
        </>
    );  
};

export default Favourites;

