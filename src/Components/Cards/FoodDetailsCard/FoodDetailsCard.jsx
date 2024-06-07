import React, { useState, useEffect } from 'react';
import defImg from '../../../Assets/Images/Food-1.jpg';
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
        <div className="food-details-overlay DetailsParent" onClick={onClose} data-aos="fade">
            <MDBCard className='FoodDetailsCard' onClick={e => e.stopPropagation()}>
                <div style={{position:"relative" ,maxHeight:"400px", overflow:"hidden"}}>
                    <MDBCardImage src={ food.LinkDrive  || defImg } position='top' alt={food.FoodName} />
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
                    <div className="detailsParaWrapper">
                        <div style={{fontWeight:"500", fontSize:"16px"}}>Details:</div>
                        <p className='DParagraph'>
                            {food.TheDescription}
                        </p> 
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className="like-button-container">
                            <FaHeart style={{ color: 'var(--color-primary)', marginRight:"3px" }} /> 
                            <span style={{ color: 'var(--color-primary)', position:"relative", top:"2px" }}>{likesCount}</span> 
                        </div>
                        <MDBBtn color="info" onClick={onClose}>Close</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default FoodDetailsCard;
