import { PageContainer } from '../../Components'
import { Favourites, ProfileHeader } from '../../Sections'

import './Profile.css'




const Profile = ({ profilePictureUrl, setProfilePictureUrl, favorites, setFavorites, setLiked, likedCategories, setLikedCategories}) => {

    return (
        <>
            <div className="ProfilePage">
                <ProfileHeader 
                profilePictureUrl={profilePictureUrl} 
                setProfilePictureUrl={setProfilePictureUrl} 
                />
                <PageContainer>
                    <Favourites 
                    favorites={favorites} 
                    setFavorites={setFavorites}
                    likedCategories={likedCategories}
                    setLikedCategories={setLikedCategories}
                    />
                </PageContainer>
            </div>   
        </>
    )
}

export default Profile