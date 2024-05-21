import { ProfileHeader } from '../../Sections'

import './Profile.css'




const Profile = ({ profilePictureUrl, setProfilePictureUrl }) => {

    return (
        <>
            <div className="ProfilePage">
                <ProfileHeader 
                profilePictureUrl={profilePictureUrl} 
                setProfilePictureUrl={setProfilePictureUrl} 
                />
            </div>   
        </>
    )
}

export default Profile