import { TabletNav, MainNav } from '../../Components'
import './WebNav.css'
import './HomeNav.css'



const WebNav = ({ profilePictureUrl, defaultProfilePicture }) => {
    return (
        <>
            <MainNav profilePictureUrl={profilePictureUrl} defaultProfilePicture={defaultProfilePicture}/>
            <TabletNav />
        </>
    ) 
}

export default WebNav