import { PageContainer } from '../../Components'
import { CategorySec } from '../../Sections'

import './Category.css'




const Category = ({favorites, setFavorites, likedCategories, setLikedCategories}) => {
    return (
        <>
            <div className="CategoryPage">
                <PageContainer>
                    <CategorySec 
                    favorites={favorites} 
                    setFavorites={setFavorites}
                    likedCategories={likedCategories}
                    setLikedCategories={setLikedCategories}
                    />
                </PageContainer>
            </div>
        </>
    )
}

export default Category