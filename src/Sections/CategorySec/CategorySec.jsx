import axios from "axios";
import React, { useEffect, useState, Suspense, useMemo, useRef, useCallback } from "react";
import { SectionWrapper, CategorySearch } from '../../Components'
import { FaList, FaXmark } from "react-icons/fa6";
import './CategorySec.css'

const LazyCategoryCard = React.lazy(() => import('../../Components/Cards/CategoryCard/CategoryCard'));

const CategorySec = ({favorites, setFavorites}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Track the current page
    const [searchQuery, setSearchQuery] = useState(""); // Track the search query
    const [selectedCard, setSelectedCard] = useState(null); // Track the selected card
    const [noResults, setNoResults] = useState(false); // Track whether there are no search results
    const observer = useRef(null);

    const fetchData = useCallback(async () => {
        try {
            const apiLink = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
            const newData = apiLink.data;

            setData(prevData => [...prevData, ...newData]); // Append new data to existing data
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true);
        }
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage(prevPage => prevPage + 1);
        }
    }, []);

    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });

        if (observer.current) {
            const loadingRef = document.querySelector(".loadingMoreRef");
            if (loadingRef) {
                observer.current.observe(loadingRef);
            }
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [handleObserver]);

    const memoizedDataItems = useMemo(() => {
        const filteredData = data.filter(dataItem =>
            dataItem.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setNoResults(filteredData.length === 0); // Check if there are no search results
        return filteredData.map(dataItem => ({
            id: dataItem.id,
            imageUrl: dataItem.url,
            title: dataItem.title
        }));
    }, [data, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleCardClick = (id) => {
        setSelectedCard(id);
    };

    const memoizedDataItemsCards = memoizedDataItems.map((dataItem, index) => (
        <Suspense key={index} fallback={<div>Loading...</div>}>
            <LazyCategoryCard
                key={dataItem.id}
                id={dataItem.id}
                imageUrl={dataItem.imageUrl}
                title={dataItem.title}
                onMoreClick={() => handleCardClick(dataItem.id)}
                favorites={favorites}
                setFavorites={setFavorites}
            />
        </Suspense>
    ));


    // Fullscreen view
    const fullscreenView = selectedCard ? (
        <div className="fullscreen">
            <img src={memoizedDataItems.find(item => item.id === selectedCard)?.imageUrl} alt="Fullscreen" />
            <button onClick={() => setSelectedCard(null)}>
                <FaXmark />
            </button>
        </div>
    ) : null;

    return (
        <>
            <div className="CategorySec">
                <div className="CatHeaderContainer">
                    <div className="CatHeaderItem categoryCardsHeader">
                        <div className="HeaderTitle">
                            <FaList />
                            <span>Category</span>
                        </div>
                        <CategorySearch onSearch={handleSearch} />
                    </div>
                </div>
                <SectionWrapper>
                    <div className="categoryCards">
                        {memoizedDataItemsCards}
                        <div className="loadingMoreRef CategoryCard">
                            { noResults && !loading && memoizedDataItems.length === 0 
                            ? <span>Sorry, no results found for "{searchQuery}".</span>
                            : <span>loading...</span>
                            }
                        </div>
                    </div>
                </SectionWrapper>
                {/* Display loading indicator if loading is true */}
                {loading && <p> Loading... </p>}
            </div>
            {fullscreenView}
        </>
    )
}

export default CategorySec;




