import { useState, useEffect } from 'react';
import { CategoryCard, SectionWrapper, CategorySearch } from '../../Components';
import { FaTrashAlt } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import './Favourites.css';

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Track the search query
    const [filteredFavorites, setFilteredFavorites] = useState([]); // Track filtered favorites
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false); // Track whether to show no results message

    useEffect(() => {
        // Retrieve liked cards from localStorage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        // Filter favorites based on search query
        const filtered = favorites.filter(favorite =>
            favorite.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFavorites(filtered);
        // Set whether to show no results message
        setShowNoResultsMessage(filtered.length === 0 && favorites.length === 0);
    }, [favorites, searchQuery]);

    const [selectedCard, setSelectedCard] = useState(null);

    const handleMoreClick = (id) => {
        setSelectedCard(id);
    };
    const clearFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('favorites');
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const fullscreenView = selectedCard ? (
        <div className="fullscreen">
            <img src={favorites.find(item => item.id === selectedCard)?.imageUrl} alt="Fullscreen" />
            <button onClick={() => setSelectedCard(null)}>
                <FaXmark />
            </button>
        </div>
    ) : null;

    return (
        <>
            <div className="Favourites">
                <div className="CatHeaderContainer">
                  <div className="CatHeaderItem categoryCardsHeader">
                    <div className="HeaderTitle">
                        <span>Favourites</span>
                      </div>
                  <CategorySearch onSearch={handleSearch} />
                  </div>
                </div>
                <SectionWrapper>
                    {showNoResultsMessage ? (
                        <p className="text-center">No cards added yet.</p>
                    ) : (
                        <>
                            {filteredFavorites.length === 0 ? (
                                <p className="text-center">No results found for "{searchQuery}".</p>
                            ) : (
                                <div className="favoriteCards">
                                    {filteredFavorites.map((favorite, index) => (
                                        <CategoryCard
                                            key={index}
                                            {...favorite}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                            onMoreClick={handleMoreClick} // Ensure this is passed correctly
                                        />
                                    ))}
                                </div>
                            )}
                            {favorites.length > 0 && (
                                <button className="clearBtn" onClick={clearFavorites}>
                                    <FaTrashAlt /> Delete All
                                </button>
                            )}
                        </>
                    )}
                </SectionWrapper>
            </div>
            {fullscreenView}
        </>
    );
};

export default Favourites;
