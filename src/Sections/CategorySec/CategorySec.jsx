import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SectionWrapper, CategorySearch, CategoryCard, FoodDetailsCard } from '../../Components';
import { FaList } from 'react-icons/fa6';
import './CategorySec.css';

const CategorySec = ({ setFavorites }) => {
    const [categories, setCategories] = useState([]);
    const [likedCategories, setLikedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {
        const savedLikedCategories = JSON.parse(localStorage.getItem('likedCategories')) || {};
        setLikedCategories(savedLikedCategories);

        axios.get('http://127.0.0.1:8000/getfit/get-foods/')
            .then(response => {
                const fetchedCategories = response.data;
                setCategories(fetchedCategories);
                setFilteredCategories(fetchedCategories);

                const initialLikedStates = { ...savedLikedCategories };
                fetchedCategories.forEach(category => {
                    if (initialLikedStates[category.id] === undefined) {
                        initialLikedStates[category.id] = category.liked;
                    }
                });
                setLikedCategories(initialLikedStates);
                localStorage.setItem('likedCategories', JSON.stringify(initialLikedStates));
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        const result = categories.filter(category =>
            category.FoodName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(result);
    }, [searchQuery, categories]);

    const handleMoreClick = (id) => {
        const selectedFood = categories.find(category => category.id === id);
        setSelectedFood(selectedFood);
    };

    const handleLikeClick = (id) => {
        const userId = localStorage.getItem('userID');
        axios.post(`http://127.0.0.1:8000/getfit/foods-like/${id}/${userId}/`)
            .then(response => {
                console.log(response.data.message);

                setLikedCategories(prevLikedCategories => {
                    const updatedLikedCategories = {
                        ...prevLikedCategories,
                        [id]: !prevLikedCategories[id]
                    };
                    localStorage.setItem('likedCategories', JSON.stringify(updatedLikedCategories));
                    return updatedLikedCategories;
                });

                if (response.data.message === 'You have unliked this food.') {
                    setFavorites(prevFavorites => prevFavorites.filter(food => food.id !== id));
                }
            })
            .catch(error => {
                console.error('Error liking food:', error);
            });
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <div className="CategorySec">
                <div className="CatHeaderContainer">
                    <div className="CatHeaderItem categoryCardsHeader">
                        <div className="HeaderTitle">
                            <FaList />
                            <span>Category</span>
                        </div>
                        <CategorySearch onSearch={handleSearchChange} />
                    </div>
                </div>
                <SectionWrapper>
                    <div className="categoryCards">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                                <CategoryCard
                                    key={category.id}
                                    id={category.id}
                                    title={category.FoodName}
                                    imageUrl={category.LinkDrive}
                                    calories={category.Calories}
                                    protein={category.Protein}
                                    fats={category.Fats}
                                    carbs={category.Carbs}
                                    likes={category.likes}
                                    onMoreClick={handleMoreClick}
                                    onLikeClick={handleLikeClick}
                                    likeBtn={likedCategories[category.id] || false} // Pass the liked state
                                />
                            ))
                        ) : (
                            <p className='text-center w-100'>No Result Found For "{searchQuery}" </p>
                        )}
                    </div>
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

export default CategorySec;
