// // import React, { useState, useRef } from "react";
// // import { FaSearch } from "react-icons/fa";
// // import './CategorySearch.css'

// // const CategorySearch = ({ onSearch }) => {
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const searchInputRef = useRef(null);

// //     const handleChange = (event) => {
// //         const { value } = event.target;
// //         setSearchTerm(value);
// //         onSearch(value); // Pass the search query back to the parent component
// //     };

// //     const handleClear = () => {
// //         setSearchTerm("");
// //         onSearch(""); 
// //     };

// //     const handleCheckboxChange = (event) => {
// //         if (event.target.checked) {
// //             searchInputRef.current.focus(); // Focus the search input when checkbox is checked
// //         }
// //     };

// //     return (
// //         <div className="CatHeaderItem searchWrapper">
// //             <input
// //                 ref={searchInputRef}
// //                 className="searchInp"
// //                 type="search"
// //                 placeholder="Search..."
// //                 id="searchID"
// //                 value={searchTerm}
// //                 onChange={handleChange}
// //             />
// //             <input
// //                 type="checkbox"
// //                 className="searchCheckBx"
// //                 id="searchBtn"
// //                 onChange={handleCheckboxChange}
// //             />
// //             <label className="searchIcon" htmlFor="searchBtn" onClick={handleClear}>
// //                 <FaSearch />
// //             </label>
// //         </div>
// //     );
// // };

// // export default CategorySearch;


// import React, { useState, useEffect, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import './CategorySearch.css'

// const CategorySearch = ({ onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [checked, setChecked] = useState(false);
//     const searchInputRef = useRef(null);

//     useEffect(() => {
//         const handleResize = () => {
//             setChecked(window.innerWidth <= 500);
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);

//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         if (checked && searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     }, [checked]);

//     const handleChange = (event) => {
//         const { value } = event.target;
//         setSearchTerm(value);
//         onSearch(value);
//     };

//     const handleClear = () => {
//         setSearchTerm("");
//         onSearch("");
//     };

//     return (
//         <div className="CatHeaderItem searchWrapper">
//             <input
//                 ref={searchInputRef}
//                 className="searchInp"
//                 type="search"
//                 placeholder="Search..."
//                 id="searchID"
//                 value={searchTerm}
//                 onChange={handleChange}
//             />
//             <input
//                 type="checkbox"
//                 className="searchCheckBx"
//                 id="searchBtn"
//                 checked={checked}
//                 onChange={() => setChecked(!checked)}
//             />
//             <label className="searchIcon" htmlFor="searchBtn" onClick={handleClear}>
//                 <FaSearch />
//             </label>
//         </div>
//     );
// };

// export default CategorySearch;



import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import './CategorySearch.css'

const CategorySearch = ({ onSearch, searchResults }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [checked, setChecked] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const searchInputRef = useRef(null);

    // Make Check Box Checked By Default When Window is 500px
    useEffect(() => {
        const handleResize = () => {
            setChecked(window.innerWidth <= 500);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (checked && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [checked]);



    useEffect(() => { // Check if searchResults is defined before accessing its length property
        setNoResults(searchResults && searchResults.length === 0); 
    }, [searchResults]);



    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };
    const handleClear = () => {
        setSearchTerm("");
        onSearch("");
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
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <label className="searchIcon" htmlFor="searchBtn" onClick={handleClear}>
                <FaSearch />
            </label>
            {noResults && <p>Sorry, "{searchTerm}" not found.</p>}
        </div>
    );
};

export default CategorySearch;

