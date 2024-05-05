import CategoryCardsData from "../../Data/CategoryCardsData";
import { SectionWrapper, CategoryCard, CategorySearch } from '../../Components'
import { FaList } from "react-icons/fa6";
import './CategorySec.css'




const CategorySec = () => {
    const cards = CategoryCardsData.map( card => {
        return <CategoryCard key={ card.id }
        id          = { card.id             }
        image       = { card.image          }
        name        = { card.name           }
        description = { card.description    }
        calories    = { card.calories       }
        protein     = { card.protein        }
        fats        = { card.fats           }
        healOpj     = { card.healOpj        }
        pagePath    = { card.pagePath       }
        />
    })
    return (
        <>
            <div className="CategorySec">
                <SectionWrapper>
                    <div className="CatHeaderItem categoryCardsHeader">
                        <div className="HeaderTitle">
                            <FaList />
                            <span>Category</span> 
                        </div>
                        <CategorySearch />
                    </div>
                    <div className="categoryCards">
                        {cards}
                    </div>
                </SectionWrapper>
            </div>
        </>
    )
}

export default CategorySec