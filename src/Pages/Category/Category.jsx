import { PageContainer } from '../../Components'
import { CategorySec } from '../../Sections'

import './Category.css'




const Category = ({favorites, setFavorites}) => {
    return (
        <>
            <div className="CategoryPage">
                <PageContainer>
                    <CategorySec favorites={favorites} setFavorites={setFavorites}/>
                </PageContainer>
            </div>
        </>
    )
}

export default Category