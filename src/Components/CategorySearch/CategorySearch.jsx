import { FaSearch } from "react-icons/fa";
import './CategorySearch.css'






const CategorySearch = () => {
    return (
        <>
            <div className="CatHeaderItem searchWrapper">
                <input className="searchInp" type="search" name="" id="searchID" />
                <input type="checkbox" className="searchCheckBx" id="searchBtn" />
                <label className="searchIcon" htmlFor="searchBtn">
                    <FaSearch />
                </label>
            </div>
        </>
    )
}

export default CategorySearch