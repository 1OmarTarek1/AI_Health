import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ProfileImage } from '../../Components';
import defaultProfilePicture from '../../Assets/Images/no_user.png';
import { FaEdit, FaFireAlt, FaRunning, FaTransgender, FaTrashAlt, FaWeight } from 'react-icons/fa';
import { IoManSharp } from "react-icons/io5";
import './ProfileHeader.css';
import './infoForm.css';
import { FaCheck } from 'react-icons/fa6';

const ProfileHeader = ({ profilePictureUrl, setProfilePictureUrl, username }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isEditInfoVisible, setIsEditInfoVisible] = useState(false);
    const [formGender, setFormGender] = useState(localStorage.getItem('formGender') || '');
    const [formActivity, setFormActivity] = useState(localStorage.getItem('formActivity') || '');
    const [formWeight, setFormWeight] = useState(localStorage.getItem('formWeight') || '');
    const [formHeight, setFormHeight] = useState(localStorage.getItem('formHeight') || '');
    const [cal, setCal] = useState(localStorage.getItem('cal') || '');
    const [perfWei, setPerfWei] = useState(localStorage.getItem('perfWei') || '');
    const [errorMessage, setErrorMessage] = useState('');

    const GenderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];
    const ActivityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
    ];

    const handleGenderChange = (selectedOption) => {
        setFormGender(selectedOption.value);
    };

    const handleActivityChange = (selectedOption) => {
        setFormActivity(selectedOption.value);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formGender || !formActivity || !formWeight || !formHeight) {
            setErrorMessage('All fields are required.');
            return;
        }
        setIsEditInfoVisible(false);
        setErrorMessage('');
        try {
            const response = await axios.post(`http://127.0.0.1:8000/getfit/CalculateCalories/`, {
                gender: formGender,
                activity: formActivity,
                weight: formWeight,
                height: formHeight
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

    const toggleEditInfo = () => {
        setIsEditInfoVisible(!isEditInfoVisible);
    };

    const handleClearProfileDetails = () => {
        setIsEditInfoVisible(!isEditInfoVisible);
        setFormGender('');
        setFormWeight('');
        setFormActivity('');
        setFormHeight('');
        setCal('');
        setPerfWei('');
        localStorage.removeItem('formGender');
        localStorage.removeItem('formWeight');
        localStorage.removeItem('formActivity');
        localStorage.removeItem('formHeight');
        localStorage.removeItem('cal');
        localStorage.removeItem('perfWei');
    };

    const handleCancelEdit = () => {
        setIsEditInfoVisible(false);
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
                            {localStorage.getItem('username')}
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
                                {formGender || "-"}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaRunning />
                                <span>Activity</span>
                            </div>
                            <div className="detVal">
                                {formActivity || "-"}
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <FaWeight />
                                <span>Weight</span>
                            </div>
                            <div className="detVal">
                                {formWeight || "-"} kg
                            </div>
                        </div>
                        <div className='details-item'>
                            <div className="detTitle">
                                <IoManSharp />
                                <span>Height</span>
                            </div>
                            <div className="detVal">
                                {formHeight || "-"} cm 
                            </div>
                        </div>
                        { cal && <>
                            <div className='details-item'>
                                <div className="detTitle">
                                    <FaFireAlt />
                                    <span>Calorie Rate</span>
                                </div>
                                <div className="detVal">
                                    {cal || "-" } cal 
                                </div>
                            </div>
                            <div className='details-item'>
                                <div className="detTitle">
                                    <FaCheck />
                                    <span>Perfect Weight</span>
                                </div>
                                <div className="detVal">
                                    {perfWei || "-" } kg 
                                </div>
                            </div>
                        </>}
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

                    <Select
                        className='selectInp'
                        value={GenderOptions.find(GenderOption => GenderOption.value === formGender)}
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
                                '&:hover': {
                                    borderColor: 'var(--color-primary)',
                                },
                                '&:focus': {
                                    outline: 'none',
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
                        }}
                    />

                    <Select
                        className='selectInp'
                        value={ActivityOptions.find(ActivityOption => ActivityOption.value === formActivity)}
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
                                '&:hover': {
                                    borderColor: 'var(--color-primary)',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    border: 'none',
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

                    {errorMessage && <div className="error-message" style={{color:"red", fontSize:"14px"}}>{errorMessage}</div>}

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
