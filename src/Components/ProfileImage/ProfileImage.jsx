import './ProfileImage.css'
import defImg from '../../Assets/Images/no_user.png'






const ProfileImage = ({ handleProfileClick, profilePictureUrl, defaultProfilePicture }) => {
    return (
        <>
            <div className="profilePhotoWrapper">
                <div className="profile-picture" onClick={handleProfileClick}>
                    <img 
                        src={profilePictureUrl || defaultProfilePicture || defImg} 
                        alt="Profile" 
                        className='profileImg img-fluid'
                    />
                </div>
            </div>
        </>
    )
}

export default ProfileImage