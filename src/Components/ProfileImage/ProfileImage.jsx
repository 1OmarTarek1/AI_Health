import './ProfileImage.css'

// import defImg from '../../Assets/Images/no_user.png'
import { FaEdit } from 'react-icons/fa'




const ProfileImage = ({ handleProfileClick, profilePictureUrl, defaultProfilePicture, handleOpenEdit }) => {
    return (
        <>
            <div className="profilePhotoWrapper" data-aos="zoom-out">
                <div className="profile-picture" onClick={handleProfileClick}>
                    <img 
                        src={ profilePictureUrl || defaultProfilePicture } 
                        alt="Profile" 
                        className='profileImg img-fluid'
                    />
                </div>
                <button className='openEditBox' onClick={handleOpenEdit}>
                    <FaEdit /> 
                </button>
            </div>
        </>
    )
}

export default ProfileImage