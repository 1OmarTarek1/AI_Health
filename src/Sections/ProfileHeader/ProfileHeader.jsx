import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { ProfileImage } from '../../Components';
import defaultProfilePicture from '../../Assets/Images/no_user.png';
import { FaEdit, FaRunning, FaTransgender, FaTrashAlt, FaWeight, FaBirthdayCake } from 'react-icons/fa';
import './ProfileHeader.css';
import './infoForm.css';

const ProfileHeader = ({ profilePictureUrl, setProfilePictureUrl, username}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isEditInfoVisible, setIsEditInfoVisible] = useState(false);
    const [formGender, setFormGender] = useState('');
    const [formWeight, setFormWeight] = useState('');
    const [formActivity, setFormActivity] = useState('');
    const [formAge, setFormAge] = useState('');
    // const [fetchedUsername, setFetchedUsername] = useState(username);

    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         try {
    //             if (!username) return; // If username is not provided, don't make the request
    //             const response = await axios.get(`http://127.0.0.1:8000/getfit/GetUsernameView/${username}/`);
    //             setFetchedUsername(response.data);
    //         } catch (error) {
    //             console.error('Error fetching username:', error);
    //             setFetchedUsername('Error');
    //         }
    //     };
    
    //     fetchUsername();
    // }, [username]);

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
        localStorage.setItem('formAge', formAge);

        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
        setFormAge('');

        // Close the form
        setIsEditInfoVisible(false);
    };

    useEffect(() => {
        // Retrieve form values from localStorage
        const storedGender = localStorage.getItem('formGender');
        const storedWeight = localStorage.getItem('formWeight');
        const storedActivity = localStorage.getItem('formActivity');
        const storedAge = localStorage.getItem('formAge');
        // Set form values
        setFormGender(storedGender || '');
        setFormWeight(storedWeight || '');
        setFormActivity(storedActivity || '');
        setFormAge(storedAge || '');
    }, []);

    const toggleEditInfo = () => {
        setIsEditInfoVisible(!isEditInfoVisible);
    };

    const handleClearProfileDetails = () => {
        localStorage.removeItem('formGender');
        localStorage.removeItem('formWeight');
        localStorage.removeItem('formActivity');
        localStorage.removeItem('formAge');

        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
        setFormAge('');
    };

    const handleCancelEdit = () => {
        setIsEditInfoVisible(false);
        // Clear form values
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
        setFormAge('');
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
                        <div className="infoItem full-name">
                            {/* { fetchedUsername } */}
                            { localStorage.getItem('username') }
                        </div>
                        <div className="infoItem bio"></div>
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
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaBirthdayCake />
                                <span>Age</span>
                            </div>
                            <div className="detVal">
                                {localStorage.getItem('formAge') || "-"} years
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
                        <select 
                        id="Gender"   
                        className="infoInp" 
                        value={formGender} 
                        onChange={(e) => setFormGender(e.target.value)} 
                        >
                            <option className='option default-option' value="">Select Gender</option>
                            <option className='option' value="Male">Male</option>
                            <option className='option' value="Female">Female</option>
                        </select>
                        {/* <label className='infoLabels' htmlFor="Gender">
                            <FaTransgender />
                        </label> */}
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
                        <select 
                        id="Activity" 
                        className="infoInp" 
                        value={formActivity} 
                        onChange={(e) => setFormActivity(e.target.value)} 
                        >
                            <option className='option default-option' value="">Select Activity</option>
                            <option className='option' value="Low">Low</option>
                            <option className='option' value="Normal">Normal</option>
                            <option className='option' value="High">High</option>
                        </select>
                        {/* <label className='infoLabels' htmlFor="Activity">
                            <FaRunning />
                        </label> */}
                    </div>

                    <div style={{position:"relative"}}>                        
                        <input 
                        type="text" 
                        id="Age" 
                        className="infoInp" 
                        placeholder='Age Years' 
                        value={formAge} 
                        onChange={(e) => setFormAge(e.target.value)} 
                        />
                        <label className='infoLabels' htmlFor="Age">
                            <FaBirthdayCake />
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
};

export default ProfileHeader;
