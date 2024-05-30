import { PageContainer } from '../../Components'
import { Favourites, ProfileHeader } from '../../Sections'

import './Profile.css'




const Profile = ({ profilePictureUrl, setProfilePictureUrl, favorites, setFavorites, setLiked, username}) => {

    return (
        <>
            <div className="ProfilePage">
                <ProfileHeader 
                profilePictureUrl={profilePictureUrl} 
                setProfilePictureUrl={setProfilePictureUrl} 
                username={username}
                />
                <PageContainer>
                    <Favourites favorites={favorites} setFavorites={setFavorites} setLiked={setLiked}/>
                </PageContainer>
            </div>   
        </>
    )
}

export default Profile