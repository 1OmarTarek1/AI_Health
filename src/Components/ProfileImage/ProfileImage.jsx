import './ProfileImage.css'






const ProfileImage = ({ handleProfileClick, profilePictureUrl, defaultProfilePicture }) => {
    return (
        <>
            <div className="profilePhotoWrapper">
                <div className="profile-picture" onClick={handleProfileClick}>
                    <img 
                        src={profilePictureUrl || defaultProfilePicture} 
                        alt="Profile" 
                        className='profileImg img-fluid'
                    />
                </div>
            </div>
        </>
    )
}

export default ProfileImage