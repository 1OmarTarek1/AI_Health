import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import './CategorySearch.css'

const CategorySearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const searchInputRef = useRef(null);

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value); // Pass the search query back to the parent component
    };

    const handleClear = () => {
        setSearchTerm("");
        onSearch(""); 
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            searchInputRef.current.focus(); // Focus the search input when checkbox is checked
        }
    };

    return (
        <div className="CatHeaderItem searchWrapper">
            <input
                ref={searchInputRef}
                className="searchInp"
                type="search"
                placeholder="Search..."
                id="searchID"
                value={searchTerm}
                onChange={handleChange}
            />
            <input
                type="checkbox"
                className="searchCheckBx"
                id="searchBtn"
                onChange={handleCheckboxChange}
            />
            <label className="searchIcon" htmlFor="searchBtn" onClick={handleClear}>
                <FaSearch />
            </label>
        </div>
    );
};

export default CategorySearch;
