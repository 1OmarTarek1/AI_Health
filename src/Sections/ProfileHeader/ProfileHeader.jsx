import React, { useState, useEffect } from 'react';
import { ProfileImage } from '../../Components';
import defaultProfilePicture from '../../Assets/Images/no_user.png';
import { FaEdit, FaRunning, FaTransgender, FaTrashAlt, FaWeight } from 'react-icons/fa';
import './ProfileHeader.css';
import './infoForm.css';

const ProfileHeader = ({ profilePictureUrl, setProfilePictureUrl }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isEditInfoVisible, setIsEditInfoVisible] = useState(false);
    const [formGender, setFormGender] = useState('');
    const [formWeight, setFormWeight] = useState('');
    const [formActivity, setFormActivity] = useState('');

    useEffect(() => {
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
        setProfilePictureUrl(defaultProfilePicture);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Update localStorage upon form submission
        localStorage.setItem('formGender', formGender);
        localStorage.setItem('formWeight', formWeight);
        localStorage.setItem('formActivity', formActivity);

        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');

        // Close the form
        setIsEditInfoVisible(false);
    }

    useEffect(() => {
        // Retrieve form values from localStorage
        const storedGender = localStorage.getItem('formGender');
        const storedWeight = localStorage.getItem('formWeight');
        const storedActivity = localStorage.getItem('formActivity');
        // Set form values
        setFormGender(storedGender || '');
        setFormWeight(storedWeight || '');
        setFormActivity(storedActivity || '');
    }, []);

    const toggleEditInfo = () => {
        setIsEditInfoVisible(!isEditInfoVisible);
    }

    const handleClearProfileDetails = () => {
        localStorage.removeItem('formGender');
        localStorage.removeItem('formWeight');
        localStorage.removeItem('formActivity');

        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
    }

    const handleCancelEdit = () => {
        setIsEditInfoVisible(false);
        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
    }

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
                        <div className="infoItem full-name">Omar Tarek</div>
                        <div className="infoItem bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>

                    <div className="profile-details" onClick={toggleEditInfo}>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaTransgender />
                                <span>Gender</span>
                            </div>
                            <div className="detVal">
                                {localStorage.getItem('formGender') || "-"}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaWeight />
                                <span>Weight</span>
                            </div>
                            <div className="detVal">
                                {localStorage.getItem('formWeight') || "-"} kg
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaRunning />
                                <span>Activity</span>
                            </div>
                            <div className="detVal">
                                {localStorage.getItem('formActivity') || "-"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={isFullScreen ? "fullscreen-profile" : "fullscreen-close"}
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


            <div className={isEditInfoVisible ? 'infoFormWrapper' : 'infoFormWrapper closeInfoFormWrapper'}>
                <form className="infoForm" onSubmit={handleSubmit}>
                    <div className='InfoTitleForm'>
                        Information
                    </div>

                    <div style={{position:"relative"}}>                        
                        <input 
                        type="text" 
                        id="Gender"   
                        className="infoInp" 
                        placeholder='Gender' 
                        value={formGender} 
                        onChange={(e) => setFormGender(e.target.value)} 
                        />
                        <label className='infoLabels' htmlFor="Gender">
                            <FaTransgender />
                        </label>
                    </div>

                    <div style={{position:"relative"}}>                        
                        <input 
                        type="text" 
                        id="Weight"   
                        className="infoInp" 
                        placeholder='Weight kg' 
                        value={formWeight} 
                        onChange={(e) => setFormWeight(e.target.value)} 
                        />
                        <label className='infoLabels' htmlFor="Weight">
                            <FaWeight />
                        </label>
                    </div>

                    <div style={{position:"relative"}}>                        
                        <input 
                        type="text" 
                        id="Activity" 
                        className="infoInp" 
                        placeholder='Activity' 
                        value={formActivity} 
                        onChange={(e) => setFormActivity(e.target.value)} 
                        />
                        <label className='infoLabels' htmlFor="Activity">
                            <FaRunning />
                        </label>
                    </div>

                    <div className='d-flex gap-1 mt-2'>
                        <button className='infoFormBtn' type="submit">Update</button>
                        <button 
                        className="infoFormBtn clear-profile-details" 
                        onClick={handleClearProfileDetails}>
                            Reset
                        </button>
                        <span 
                        className='infoFormBtn' 
                        onClick={handleCancelEdit}>
                            Cancel
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileHeader;
