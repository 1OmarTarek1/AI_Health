import { PageContainer } from '../../Components'
import { Favourites, ProfileHeader } from '../../Sections'

import './Profile.css'




const Profile = ({ profilePictureUrl, setProfilePictureUrl, favorites, setFavorites }) => {

    return (
        <>
            <div className="ProfilePage">
                <ProfileHeader 
                profilePictureUrl={profilePictureUrl} 
                setProfilePictureUrl={setProfilePictureUrl} 
                />
                <PageContainer>
                    <Favourites favorites={favorites} setFavorites={setFavorites}/>
                </PageContainer>
            </div>   
        </>
    )
}

export default Profile