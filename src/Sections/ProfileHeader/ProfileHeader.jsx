import React, { useState, useEffect } from 'react';
import { ProfileImage } from '../../Components';
import defaultProfilePicture from '../../Assets/Images/no_user.png';
import { FaEdit, FaRunning, FaTransgender, FaTrashAlt, FaWeight } from 'react-icons/fa';
import './ProfileHeader.css';

const ProfileHeader = ({ profilePictureUrl, setProfilePictureUrl }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    

    const user = {
        defaultProfilePicture: defaultProfilePicture , // Default user icon URL
        username: 'Omar_Tarek_1',
        fullName: 'Omar Tarek',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        weight: 70,
        gender: "Male",
        activity: "High"
    };

    useEffect(() => {
        // Store profile picture URL in local storage whenever it changes
        localStorage.setItem('profilePictureUrl', profilePictureUrl);
    }, [profilePictureUrl]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePictureUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileClick = () => {
        setIsFullScreen(true);
    };

    const handleCloseFullScreen = () => {
        setIsFullScreen(false);
    };

    const handleRemoveProfilePhoto = () => {
        // Set profile picture URL to default when the button is clicked
        setProfilePictureUrl(defaultProfilePicture);
    };

    return (
        <>
            <div className="ProfileHeaderContainer">
                <div className="ProfileHeader">              
                    <ProfileImage 
                    handleProfileClick={handleProfileClick} 
                    profilePictureUrl={profilePictureUrl}
                    defaultProfilePicture={defaultProfilePicture}
                    />

                    <div className="userInfo">
                        {/* <div className="infoItem username">{user.username}</div> */}
                        <div className="infoItem full-name">{user.fullName}</div>
                        <div className="infoItem bio">{user.bio}</div>
                    </div>

                    <div className="profile-details">
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaTransgender />
                                <span>Gender</span>
                            </div>
                            <div className="detVal">
                                {user.gender}
                            </div>
                        </div>
                        <div className='details-item'>
                        <div className="detTitle">
                                <FaWeight />
                                <span>Weight</span>
                            </div>
                            <div className="detVal">
                                {user.weight}kg
                            </div>
                        </div>
                        <div className='details-item'>
                        <div className="detTitle">
                                <FaRunning />
                                <span>Activity</span>
                            </div>
                            <div className="detVal">
                                {user.activity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
            className={isFullScreen ? "fullscreen-profile" : "fullscreen-close" } 
            onClick={handleCloseFullScreen}
            >
                <img src={profilePictureUrl || defaultProfilePicture} alt="Profile" />               
                <label htmlFor="file-upload" className="uploadImg">
                    <FaEdit />
                    <input 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                    />
                </label>
                <button className='removePhoto' onClick={handleRemoveProfilePhoto}>
                    <FaTrashAlt />
                </button>
            </div>

        </>
    );
}

export default ProfileHeader;
