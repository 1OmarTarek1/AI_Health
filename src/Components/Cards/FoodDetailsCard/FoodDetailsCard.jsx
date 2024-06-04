import React, { useState, useEffect } from 'react';
import dsda from '../../../Assets/Images/food_photos/Chicken Rice Curry With Coconut.jpg';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FaHeart, FaPlay } from 'react-icons/fa6'; // Import FaHeart icon
import './FoodDetailsCard.css';

const FoodDetailsCard = ({ food, onClose }) => {
    const [likesCount, setLikesCount] = useState(food.likes.length);

    useEffect(() => {
        setLikesCount(food.likes.length);
    }, [food]);

    return (
        <div className="food-details-overlay DetailsParent" onClick={onClose}>
            <MDBCard className='FoodDetailsCard' onClick={e => e.stopPropagation()}>
                <div style={{position:"relative"}}>
                    <MDBCardImage src={ dsda || food.LinkDrive  || 'https://mdbootstrap.com/img/new/standard/nature/184.webp'} position='top' alt={food.FoodName} />
                    <MDBCardTitle className='DName'>{food.FoodName}</MDBCardTitle>
                    <a className='DLink' href={food.YoutubeLink} target="_blank" rel="noopener noreferrer">
                        <span>
                            <FaPlay />
                        </span>
                    </a>
                </div>
                <MDBCardBody>
                    <ul className="foodDetails">
                        <li>
                            Calories 
                            <div>
                                {food.Calories}cal
                            </div>
                        </li>
                        <li>
                            Protein 
                            <div>
                                {food.Protein}gm
                            </div>
                        </li>
                        <li>
                            Fats 
                            <div>
                                {food.Fats}gm
                            </div>
                        </li>
                        <li>
                            Carbs 
                            <div>
                                {food.Carbs}gm
                            </div>
                        </li>
                    </ul>
                    <div style={{fontWeight:"500", fontSize:"16px"}}>Details:</div>
                    <p style={{
                        lineHeight:"1.4rem",
                        marginBottom:"20px"
                    }}>
                        {food.TheDescription}
                    </p> 
                    <div className='d-flex justify-content-between'>
                        <div className="like-button-container">
                            {likesCount === 0 
                            ? <>
                                <FaHeart style={{ color: '#333', marginRight:"3px" }} /> 
                                <span style={{ color: '#333', position:"relative", top:"2px" }}>{likesCount}</span> 
                            </>
                            
                            : <>
                                <FaHeart style={{ color: '#ff0000', marginRight:"3px"}} /> 
                                <span style={{ color: '#ff0000', position:"relative", top:"2px"}}>{likesCount}</span> 
                            </>
                            }
                        </div>
                        <MDBBtn color="danger" onClick={onClose}>Close</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default FoodDetailsCard;
