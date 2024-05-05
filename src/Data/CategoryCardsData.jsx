import { FaCheck, FaXmark } from 'react-icons/fa6'
import food_1 from '../Assets/Images/Food-1.jpg'
import food_2 from '../Assets/Images/Food-2.jpg'
import food_3 from '../Assets/Images/Food-1.jpg'
import food_4 from '../Assets/Images/Food-4.jpg'





let notHealthy = <FaCheck style={{color:"lightGreen" }} /> ;
let healthy    = <FaXmark style={{color:"red"        }} /> ;


const CategoryCardsData =  [ 

    { // CARD-01 
        
        id              :  "Category_Card_01"   , 
        image           :  food_1               , 
        name            :  "Pizza"              , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  notHealthy           ,
    },
    { // CARD-02 
        id              :  "Category_Card_02"   , 
        image           :  food_2               , 
        name            :  "Pasta"              , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  notHealthy           ,
    },
    { // CARD-03 
        id              :  "Category_Card_03"   , 
        image           :  food_3               , 
        name            :  "Burger Sandwich"    , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  healthy              ,
    },
    { // CARD-04 
        id              :  "Category_Card_04"   , 
        image           :  food_4               , 
        name            :  "Chicken Meal"       , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  healthy              ,
    },
    { // CARD-05 
        id              :  "Category_Card_05"   , 
        image           :  food_1               , 
        name            :  "Pizza"              , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  healthy              ,
    },
    { // CARD-06 
        id              :  "Category_Card_06"   , 
        image           :  food_2               , 
        name            :  "Pasta"              , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  notHealthy           ,
    },
    { // CARD-07 
        id              :  "Category_Card_07"   , 
        image           :  food_3               , 
        name            :  "Burger Sandwich"    , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  notHealthy           ,
    },
    { // CARD-08 
        id              :  "Category_Card_08"   , 
        image           :  food_4               , 
        name            :  "Chicken Meal"       , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  notHealthy           ,
    },
    { // CARD-09 
        id              :  "Category_Card_09"   , 
        image           :  food_1               , 
        name            :  "Meat Meal"          , 
        description     :  "Smokey bacon, pieces of chicken, gooey melty cheese, and creamy ranch were the perfect combo to pile on a chewy crust!"      ,   
        calories        :  "800cal"             ,
        protein         :  "100gm"              ,
        fats            :  "50gm"               ,
        pagePath        :  "!#"                 , 
        healOpj         :  healthy              ,    
    },

]

export default    CategoryCardsData

