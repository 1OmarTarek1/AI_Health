import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ProfileImage } from '../../Components';
import defaultProfilePicture from '../../Assets/Images/no_user.png';
import { FaFireAlt, FaRunning, FaTransgender, FaTrashAlt, FaWeight } from 'react-icons/fa';
import { IoManSharp } from "react-icons/io5";
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaCheck, FaUpload } from 'react-icons/fa6';
import defImg from '../../Assets/Images/no_user.png'
import './ProfileHeader.css';
import './infoForm.css';

const ProfileHeader = ({ profilePictureUrl, setProfilePictureUrl }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isEditInfoVisible, setIsEditInfoVisible] = useState(false);
    const [formGender, setFormGender] = useState(localStorage.getItem('formGender') || '');
    const [formActivity, setFormActivity] = useState(localStorage.getItem('formActivity') || '');
    const [formWeight, setFormWeight] = useState(localStorage.getItem('formWeight') || '');
    const [formHeight, setFormHeight] = useState(localStorage.getItem('formHeight') || '');
    const [cal, setCal] = useState(localStorage.getItem('cal') || '');
    const [perfWei, setPerfWei] = useState(localStorage.getItem('perfWei') || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);



    const [selectedGender, setSelectedGender] = useState(localStorage.getItem('formGender') || '');
    const [selectedActivity, setSelectedActivity] = useState(localStorage.getItem('formActivity') || '');

    const GenderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];
    const ActivityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Normal', label: 'Normal' },
        { value: 'High', label: 'High' },
    ];

    const handleGenderChange = (selectedOption) => {
        setFormGender(selectedOption.value);
        setSelectedGender(selectedOption);
    };

    const handleActivityChange = (selectedOption) => {
        setFormActivity(selectedOption.value);
        setSelectedActivity(selectedOption);
    };

    useEffect(() => {
        localStorage.setItem('profilePictureUrl', profilePictureUrl);
    }, [profilePictureUrl]);

    useEffect(() => {
        localStorage.setItem('formGender', formGender);
        localStorage.setItem('formActivity', formActivity);
        localStorage.setItem('formWeight', formWeight);
        localStorage.setItem('formHeight', formHeight);
        localStorage.setItem('cal', cal);
        localStorage.setItem('perfWei', perfWei);
    }, [formGender, formActivity, formWeight, formHeight, cal, perfWei]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newProfilePictureUrl = reader.result;
                setProfilePictureUrl(newProfilePictureUrl);
                setImageUploaded(true);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePictureUrl(defaultProfilePicture);
            setImageUploaded(false);
        }
    };
    
    
    

    const handleUpdate = async () => {
        const formData = new FormData();
        const userID = localStorage.getItem('userID');
        setOpenEdit(!openEdit);
    
        // Check if profilePictureUrl is not null or empty
        if (profilePictureUrl) {
            // Convert Base64 URL to Blob
            const response = await fetch(profilePictureUrl);
            const blob = await response.blob();
            formData.append('image', blob, 'profile_image.png');
        }
    
        formData.append('id', userID);
    
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/getfit/update-profile-image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image Updated!', response.data.image);
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };


    // const handleProfileClick = () => {
    //     setIsFullScreen(true);
    // };

    const handleCloseFullScreen = () => {
        setIsFullScreen(false);
    };

    const handleRemoveProfilePhoto = () => {
        setProfilePictureUrl(defImg);
        localStorage.setItem('profilePictureUrl', profilePictureUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formGender || !formActivity || !formWeight || !formHeight) {
            setErrorMessage('All fields are required.');
            return;
        }
        setIsEditInfoVisible(false);
        setErrorMessage('');
        try {
            const response = await axios.post(`http://127.0.0.1:8000/getfit/calculate-calories/`, {
                gender: formGender,
                activity: formActivity,
                weight: formWeight,
                height: formHeight,
                user_id: localStorage.getItem('userID'),
            });
            const data = response.data;
            const caloriesCalc = data.calories;
            const perfectWeight = data.ideal_weight;
            setCal(caloriesCalc);
            setPerfWei(perfectWeight);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/getfit/get-user-info/${userID}/`);
                const data = response.data;
                setFormGender(data.gender);
                setFormActivity(data.activity);
                setFormHeight(data.height);
                setFormWeight(data.weight);
                setCal(data.calories);
                setPerfWei(data.ideal_weight);
                
                // Fetch profile photo URL from backend
                const imageResponse = await axios.get(`http://127.0.0.1:8000/getfit/user-image/${userID}/`);
                if (imageResponse.data && imageResponse.data.image_url) {
                    const imageUrl = `http://127.0.0.1:8000${imageResponse.data.image_url}`;
                    setProfilePictureUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);

    const toggleEditInfo = () => {
        setIsEditInfoVisible(!isEditInfoVisible);
    };

    const handleClearProfileDetails = async () => {
        setIsEditInfoVisible(!isEditInfoVisible);
        setFormGender('');
        setSelectedGender(null);
        setFormWeight('');
        setFormActivity('');
        setSelectedActivity(null);
        setFormHeight('');
        setCal('');
        setPerfWei('');
        localStorage.removeItem('formGender');
        localStorage.removeItem('formActivity');
        localStorage.removeItem('formWeight');
        localStorage.removeItem('formHeight');
        localStorage.removeItem('cal');
        localStorage.removeItem('perfWei');

        try {
            await axios.post(`http://127.0.0.1:8000/getfit/delete-user-data/`, {
                user_id: localStorage.getItem('userID')
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditInfoVisible(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(!openEdit);
    };



    return (
        <>
            <div className="ProfileHeaderContainer">
                <div className="ProfileHeader">
                <ProfileImage
                        handleProfileClick={() => setIsFullScreen(true)}
                        profilePictureUrl={profilePictureUrl || defaultProfilePicture}
                        handleOpenEdit={handleOpenEdit}
                    />
                    <div className="userInfo">
                        <div className="infoItem full-name">
                            {localStorage.getItem('usernameDB') || "Username"}
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
                                {formGender || "..."}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaRunning />
                                <span>Activity</span>
                            </div>
                            <div className="detVal">
                                {formActivity || "..."}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaWeight />
                                <span>Weight</span>
                            </div>
                            <div className="detVal">
                                {formWeight ? `${formWeight}kg` : "..."}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <IoManSharp />
                                <span>Height</span>
                            </div>
                            <div className="detVal">
                                {formHeight ? `${formHeight}cm` : "..."}
                            </div>
                        </div>
                        {cal && <>
                            <div className='details-item'>
                                <div className="detTitle">
                                    <FaFireAlt />
                                    <span>Calories</span>
                                </div>
                                <div className="detVal">
                                    {`${cal}cal` || "..."}
                                </div>
                            </div>
                            <div className='details-item'>
                                <div className="detTitle">
                                    <FaCheck />
                                    <span>Perfect</span>
                                </div>
                                <div className="detVal">
                                    {`${perfWei}kg` || "..."}
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </div>


            

            <div
                className={openEdit ? "editParent fullscreen-profile" : "editParent fullscreen-close"}
            >
                <div className="uploadWrapper">
                    { imageUploaded
                    ? <label htmlFor="file-upload" className="uploadImg" style={{backgroundColor:"transparent"}}>
                        <img src={profilePictureUrl} alt="Profile"/>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </label>
                    : <label htmlFor="file-upload" className="uploadImg">
                        <FaUpload />
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </label>
                    }

                    <div className="d-flex justify-content-between px-3 py-3" style={{position:"absolute", width:"100%", bottom:"0"}}> 
                        <div className="d-flex gap-2">
                            <MDBBtn className='' onClick={handleUpdate} color='success' size='sm' style={{fontSize:"11px"}}><FaCheck /> Save</MDBBtn>
                            <MDBBtn onClick={handleRemoveProfilePhoto} outline  color='secondary' size='sm' style={{fontSize:"11px", border: "1px solid", color:"red"}}><FaTrashAlt /> Delete</MDBBtn>
                        </div>
                        <MDBBtn onClick={handleOpenEdit} outline size='sm' style={{fontSize:"11px",  border: "1px solid"}}>Close</MDBBtn>
                    </div>
                </div>
            </div>

            <div
                className={isFullScreen ? "fullscreen-profile" : "fullscreen-close"}
                onClick={handleCloseFullScreen}
            >
                <img src={profilePictureUrl || defaultProfilePicture} alt="Profile" />
            </div>

            <div className={isEditInfoVisible ? 'infoFormWrapper' : 'infoFormWrapper closeInfoFormWrapper'}>
                <form className="infoForm" onSubmit={handleSubmit}>
                    <div className='InfoTitleForm'>
                        Information
                    </div>

                    <Select
                        className='selectInp'
                        value={selectedGender}
                        onChange={handleGenderChange}
                        options={GenderOptions}
                        placeholder="Select Gender"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: "250px",
                                border: 'none',
                                borderBottom: '1px solid #ffffff60',
                                backgroundColor: 'transparent',
                                color: '#fff',
                                borderRadius: "0",
                                outline: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    borderColor: 'var(--color-primary)',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none',
                                    borderColor: 'var(--color-primary)'
                                },
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: '#fff',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'var(--color-lightFont)',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: "#181818",
                                color: 'var(--color-lightFont)',
                                fontSize: "13px",
                                '&:hover': {
                                    backgroundColor: 'var(--color-primary)',
                                    color: "#fff",
                                },
                                '&:active': {
                                    backgroundColor: 'var(--color-primary)',
                                },
                            }),
                        }}
                    />

                    <Select
                        className='selectInp'
                        value={selectedActivity}
                        onChange={handleActivityChange}
                        options={ActivityOptions}
                        placeholder="Select Activity"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: "250px",
                                border: 'none',
                                borderBottom: '1px solid #ffffff60',
                                backgroundColor: 'transparent',
                                color: '#fff',
                                borderRadius: "0",
                                outline: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    borderColor: 'var(--color-primary)',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none',
                                    borderColor: 'var(--color-primary)'
                                },
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                color: '#fff',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'var(--color-lightFont)',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: "#181818",
                                color: 'var(--color-lightFont)',
                                fontSize: "13px",
                                '&:hover': {
                                    backgroundColor: 'var(--color-primary)',
                                    color: "#fff",
                                },
                                '&:active': {
                                    backgroundColor: 'var(--color-primary)',
                                },
                            }),
                        }}
                    />

                    <div style={{ position: "relative" }}>
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

                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            id="height"
                            className="infoInp"
                            placeholder='Height cm'
                            value={formHeight}
                            onChange={(e) => setFormHeight(e.target.value)}
                        />
                        <label className='infoLabels' htmlFor="height">
                            <IoManSharp />
                        </label>
                    </div>

                    {errorMessage && <div className="error-message" style={{ color: "red", fontSize: "14px" }}>{errorMessage}</div>}

                    <div className='d-flex gap-1 mt-2'>
                        <button className='infoFormBtn' type="submit">Update</button>
                        <button
                            type="button"
                            className="infoFormBtn clear-profile-details"
                            onClick={handleClearProfileDetails}
                        >
                            Reset
                        </button>
                        <span
                            className='infoFormBtn'
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProfileHeader;




